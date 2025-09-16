import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ResearchIdea } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const researchIdeaSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        title: {
          type: Type.STRING,
          description: 'A concise and academic title for a research project.',
        },
        description: {
          type: Type.STRING,
          description: 'A one-paragraph summary of the research project, including the problem, proposed solution, and potential impact.',
        },
        keywords: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: 'A list of 3-5 relevant technical keywords or fields for this research idea.',
        },
      },
      required: ["title", "description", "keywords"],
    },
};

const isValidResearchIdea = (item: any): item is ResearchIdea => {
    return (
        item &&
        typeof item.title === 'string' &&
        typeof item.description === 'string' &&
        Array.isArray(item.keywords) &&
        item.keywords.every((kw: any) => typeof kw === 'string')
    );
};


export const generateResearchIdeas = async (topic: string): Promise<ResearchIdea[]> => {
  try {
    const prompt = `Generate 3 innovative research project ideas related to the field of: "${topic}". The ideas should be suitable for an undergraduate or early-stage graduate engineering student. Focus on the intersection of software, hardware, AI, and robotics.`;

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: researchIdeaSchema,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
        throw new Error("Received an empty response from the API.");
    }

    const parsedData = JSON.parse(jsonText);
    
    // Validate that the parsed data is an array
    if (!Array.isArray(parsedData)) {
        throw new Error("Invalid response format from API: Expected an array.");
    }

    // Filter and validate each item in the array to ensure it conforms to the ResearchIdea interface
    const ideas: ResearchIdea[] = parsedData.filter(isValidResearchIdea);

    if (ideas.length === 0 && parsedData.length > 0) {
        console.warn("API response contained items with an invalid structure that were filtered out.", parsedData);
        throw new Error("API returned data in an unexpected format.");
    }

    return ideas;

  } catch (error: any) {
    console.error("Error generating research ideas:", error);
    
    const errorMessage = error.message?.toLowerCase() || '';

    if (errorMessage.includes('api key not valid')) {
        throw new Error("Invalid API Key: Please ensure your API_KEY is correctly configured in your environment.");
    }
    if (errorMessage.includes('failed to fetch') || errorMessage.includes('network request failed')) {
        throw new Error("Network Error: Could not connect to the service. Please check your internet connection and try again.");
    }
    if (error instanceof SyntaxError) {
        throw new Error("API Response Error: Failed to parse the response from the API. The service may be temporarily unavailable.");
    }
    if (errorMessage.includes('quota')) {
         throw new Error("Quota Exceeded: You have exceeded your API request quota. Please check your Google AI Studio account.");
    }

    // Default fallback
    throw new Error("An unexpected error occurred. Please try again later.");
  }
};