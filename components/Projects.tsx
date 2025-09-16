import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Project } from '../types';
import Tooltip from './Tooltip';
import { GitHubIcon } from './icons/GitHubIcon';
import { ExternalLinkIcon } from './icons/ExternalLinkIcon';
import { SearchIcon } from './icons/SearchIcon';
import { ImageIcon } from './icons/ImageIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';


const projectsData: Project[] = [
  {
    title: 'AI-Powered Sign Language Translator',
    description: 'A real-time video translation system using a custom-trained CNN model to interpret American Sign Language gestures, achieving over 95% accuracy.',
    detailedDescription: 'This project addresses communication barriers for the deaf and hard-of-hearing community. We collected a custom dataset of ASL gestures, which was used to train a Convolutional Neural Network (CNN). The model was optimized for real-time performance using TensorFlow Lite and deployed in a user-friendly Python application with an OpenCV-based interface.',
    challenges: 'Handling variations in lighting and background noise, which were mitigated through data augmentation and image preprocessing techniques. Optimizing the CNN model for real-time performance on standard hardware.',
    videoUrl: 'https://www.youtube.com/embed/gfkBBb_wM1c',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    imageUrl: 'https://images.unsplash.com/photo-1618398182914-3b8417943f11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/',
    gallery: [
      'https://images.unsplash.com/photo-1588666301416-7c917b019b8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1618398182914-3b8417943f11?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1535223289827-42f1e9919769?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
    ],
    technicalDetails: [
      { title: 'Model Architecture', description: 'Utilized a Convolutional Neural Network (CNN) with 5 convolutional layers, followed by max-pooling and two fully-connected layers. The architecture was specifically designed for gesture recognition.' },
      { title: 'Real-time Processing', description: 'The model was converted to TensorFlow Lite format for optimized inference speed. OpenCV was used for capturing and preprocessing the video feed from the webcam at 30 FPS.' },
      { title: 'Dataset & Training', description: 'A custom dataset of over 10,000 images of American Sign Language gestures was collected and annotated. The model was trained for 50 epochs, achieving a validation accuracy of 95.7%.' }
    ],
    codeSnippet: {
      language: 'python',
      description: 'This Python snippet shows the core logic for capturing video with OpenCV, preprocessing frames, and making predictions with the loaded TensorFlow Lite model.',
      code: `import cv2
import numpy as np
import tflite_runtime.interpreter as tflite

# Load the TFLite model and allocate tensors.
interpreter = tflite.Interpreter(model_path="asl_model.tflite")
interpreter.allocate_tensors()

# Get input and output tensors.
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

cap = cv2.VideoCapture(0)

while True:
    ret, frame = cap.read()
    if not ret:
        break

    # Preprocess the frame for the model
    input_frame = cv2.resize(frame, (224, 224))
    input_frame = np.expand_dims(input_frame, axis=0).astype(np.float32)

    # Run inference
    interpreter.set_tensor(input_details[0]['index'], input_frame)
    interpreter.invoke()

    # Get prediction
    output_data = interpreter.get_tensor(output_details[0]['index'])
    predicted_class = np.argmax(output_data)
    
    # Display the resulting frame with the prediction
    cv2.putText(frame, f'Prediction: {predicted_class}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Sign Language Translator', frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()`
    }
  },
  {
    title: 'Autonomous Navigation Rover',
    description: 'A Raspberry Pi-based rover utilizing ROS and computer vision for autonomous navigation and obstacle avoidance. Features SLAM for mapping environments.',
    detailedDescription: 'The goal was to build a low-cost, fully autonomous rover for indoor mapping. The robot is built on a Raspberry Pi 4, controlling motors via an Arduino. It uses a 2D LiDAR sensor for perception. The core of the navigation stack is the ROS framework, where we implemented the GMapping package for Simultaneous Localization and Mapping (SLAM) and the move_base package for path planning and obstacle avoidance. The project involved significant systems integration and tuning of ROS parameters for optimal performance.',
    challenges: 'Achieving robust localization and mapping in dynamic environments with changing obstacles. Fine-tuning the navigation stack parameters in ROS for smooth and efficient path planning.',
    tags: ['ROS', 'Python', 'C++', 'Raspberry Pi', 'SLAM'],
    imageUrl: 'https://images.unsplash.com/photo-1614275055315-9a883758b2d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
   {
    title: 'RL-Powered Robotic Grasping',
    description: 'Trained a robotic arm in a simulated environment using reinforcement learning (Deep Q-Networks) to successfully grasp a variety of objects with a high success rate.',
    detailedDescription: 'This research project explored the application of Deep Q-Networks (DQN), a reinforcement learning algorithm, for robotic grasping tasks. A 6-DOF robotic arm was trained entirely within a PyBullet simulated environment to learn optimal grasping policies for objects of varying shapes and sizes. The key challenge was bridging the "sim-to-real" gap. The model achieved an 85% success rate on real-world objects after training in simulation, demonstrating the viability of RL for complex manipulation tasks.',
    challenges: 'Bridging the "sim-to-real" gap, ensuring that the grasping policies learned in the PyBullet simulation could be successfully transferred to a physical robotic arm with minimal retraining.',
    tags: ['Reinforcement Learning', 'PyTorch', 'ROS', 'Python', 'Simulation'],
    imageUrl: 'https://images.unsplash.com/photo-1581092918458-48f32325b084?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: '3D Mapping with LiDAR',
    description: 'Created real-time 3D point cloud maps of an environment using a LiDAR sensor and SLAM algorithms, running efficiently on a Jetson Nano for onboard processing.',
    detailedDescription: 'This project focused on creating high-fidelity 3D maps of indoor environments. Using a custom-built robot equipped with a 2D LiDAR and an IMU, we implemented the Hector SLAM algorithm within ROS. The resulting 2D map was extruded into a 3D point cloud. The system runs on an NVIDIA Jetson Nano, which handles all sensor fusion and processing onboard, making it a portable and efficient mapping solution. The primary challenge was achieving accurate loop closure in large, feature-poor environments.',
    challenges: 'Achieving accurate loop closure in large, feature-poor environments, which is critical for creating globally consistent maps. Onboard processing on the Jetson Nano required significant optimization of the SLAM algorithm.',
    tags: ['LiDAR', 'SLAM', 'C++', 'ROS', 'Jetson Nano'],
    imageUrl: 'https://images.unsplash.com/photo-1678385533339-e854893c52a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Predictive Maintenance for Industrial Motors',
    description: 'Developed a machine learning model using vibration and temperature data to predict motor failures, implementing an LSTM network in PyTorch for time-series analysis.',
    detailedDescription: 'To prevent costly downtime in manufacturing, this project aimed to predict motor failures before they occur. We used a dataset of sensor readings (vibration, temperature, current) from industrial motors. An LSTM (Long Short-Term Memory) recurrent neural network was built in PyTorch to model the time-series data and predict the Remaining Useful Life (RUL) of the motors. The model successfully predicted failures with an accuracy of over 92%, providing a valuable tool for proactive maintenance scheduling.',
    challenges: 'Dealing with noisy sensor data and identifying the most predictive features for motor failure. The LSTM model required careful hyperparameter tuning to avoid overfitting and accurately capture long-term dependencies.',
    tags: ['ML', 'PyTorch', 'LSTM', 'IoT', 'Pandas'],
    imageUrl: 'https://images.unsplash.com/photo-1569894111029-e1a12c141e6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Automated Crop Monitoring Drone',
    description: 'Designed and built a quadcopter with a Jetson Nano for real-time crop health analysis using computer vision. The system identifies areas of stress for precision agriculture.',
    detailedDescription: 'This project combines drone technology and AI for precision agriculture. We built a quadcopter controlled by a Pixhawk flight controller and equipped it with a multispectral camera and an NVIDIA Jetson Nano. A custom computer vision model analyzes the captured imagery in real-time to calculate the NDVI (Normalized Difference Vegetation Index), identifying areas of crop stress due to lack of water or nutrients. This allows farmers to apply resources more efficiently, saving costs and improving yield.',
    challenges: 'Ensuring stable flight and consistent data capture in varying wind and lighting conditions. Real-time image processing on the Jetson Nano required an efficient computer vision pipeline to avoid latency.',
    tags: ['Computer Vision', 'Drones', 'Python', 'IoT', 'Jetson Nano'],
    imageUrl: 'https://images.unsplash.com/photo-1599493356238-2a7852c43d70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'IoT Smart Home System',
    description: 'A comprehensive smart home solution with custom ESP32-based sensors, an MQTT broker, and a React-based dashboard for remote monitoring and control.',
    detailedDescription: 'This project is a fully-featured smart home automation system built from the ground up. It uses custom-designed sensor nodes based on the ESP32 microcontroller to collect data on temperature, humidity, and light levels. Data is transmitted securely via the MQTT protocol to a central Raspberry Pi server. A user-friendly dashboard, built with React and Node.js, allows for real-time monitoring and control of connected devices from anywhere.',
    challenges: 'Ensuring reliable and secure communication between multiple ESP32 sensor nodes and the central MQTT broker. Designing a responsive and intuitive React dashboard for seamless user interaction.',
    tags: ['IoT', 'ESP32', 'React', 'Node.js', 'MQTT'],
    imageUrl: 'https://images.unsplash.com/photo-1596213329938-333a4115167b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    liveUrl: '#',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Gesture Control Interface',
    description: 'Developed a Python application that uses a webcam and the MediaPipe library to recognize hand gestures, allowing for touchless control of smart home devices.',
    detailedDescription: 'This project enables touchless control of a computer and smart devices through hand gestures. Using a standard webcam, the application captures video input and processes it with Google\'s MediaPipe library to detect hand landmarks in real-time. Specific gestures, such as a closed fist or an open palm, are mapped to commands like adjusting volume or toggling lights. The primary challenge was to create a robust and intuitive gesture vocabulary that minimized false positives.',
    challenges: 'Creating a robust and intuitive gesture vocabulary that minimized false positives and was easy for users to learn. Ensuring real-time performance with minimal latency between gesture and system response.',
    tags: ['OpenCV', 'MediaPipe', 'Python', 'IoT', 'UI/UX'],
    imageUrl: 'https://images.unsplash.com/photo-1587738035343-7f71f6ae452c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Swarm Robotics Simulation',
    description: 'A Python-based simulation of a robot swarm exhibiting collective behaviors like flocking and foraging using multi-agent algorithms.',
    detailedDescription: 'This project explores the emergent behavior of decentralized, multi-robot systems. Using Python and the Pygame library for visualization, we simulated a swarm of simple robots that follow a set of rules inspired by biological systems (like birds flocking). This leads to complex collective behavior, such as organized exploration and resource gathering, without any central controller. The main challenge was tuning the interaction rules to achieve stable and effective swarm behavior.',
    challenges: 'Tuning the local interaction rules (cohesion, separation, alignment) to achieve stable and effective global swarm behavior without a central controller, which required iterative experimentation.',
    tags: ['Python', 'Simulation', 'AI', 'Multi-Agent Systems'],
    imageUrl: 'https://images.unsplash.com/photo-1635224991732-8e755243146b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'GAN for Synthetic Data Generation',
    description: 'Developed a Generative Adversarial Network (GAN) in PyTorch to create realistic synthetic images for augmenting computer vision datasets.',
    detailedDescription: 'To improve the performance of image classification models when training data is scarce, we built a Deep Convolutional GAN (DCGAN). The model was trained on the CIFAR-10 dataset and learned to generate novel, realistic-looking images of objects like cars and animals. These synthetic images were then used to augment the original training set, leading to a measurable improvement in classifier accuracy. The primary challenge was achieving stable training, as GANs are notoriously difficult to converge.',
    challenges: 'Achieving stable training and avoiding common failure modes like mode collapse, where the generator produces only a limited variety of samples. This required careful selection of hyperparameters and network architecture.',
    tags: ['GAN', 'PyTorch', 'Deep Learning', 'Computer Vision'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-178e31379f83?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Voice-Controlled Smart Wheelchair',
    description: 'An assistive technology project that retrofits a standard wheelchair with voice command capabilities for navigation using an ESP32 and a custom speech recognition model.',
    detailedDescription: 'This project aims to enhance mobility for individuals with physical disabilities. We equipped a standard motorized wheelchair with an ESP32 microcontroller, which interfaces with the existing motor controllers. A microphone captures voice commands, and a lightweight, custom-trained speech recognition model running on the ESP32 interprets commands like "forward," "stop," and "turn left." The system includes ultrasonic sensors for basic obstacle avoidance, ensuring user safety. The main challenge was implementing a reliable speech recognition model on a resource-constrained microcontroller.',
    challenges: 'Implementing a reliable speech recognition model on a resource-constrained microcontroller (ESP32) while ensuring low latency and high accuracy in noisy environments.',
    tags: ['IoT', 'ESP32', 'C++', 'Assistive Tech', 'ML'],
    imageUrl: 'https://images.unsplash.com/photo-1508612583868-2b73f49372e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
  {
    title: 'Real-time Object Tracking with Kalman Filters',
    description: 'Implemented a high-speed object tracker in C++ and OpenCV that uses Kalman Filters to predict and track object trajectories in video streams.',
    detailedDescription: 'This project focuses on robustly tracking objects in real-time video. The system first detects an object using a standard detector (like YOLO). Once detected, a Kalman Filter is initialized to model the object\'s motion (position and velocity). In subsequent frames, the filter predicts the object\'s new position, which helps maintain a lock even if the detector temporarily fails (e.g., due to occlusion). This prediction-correction cycle makes the tracker highly efficient and robust. The challenge was in accurately modeling the object\'s motion and tuning the filter\'s noise parameters.',
    challenges: 'Accurately modeling the object\'s motion dynamics and tuning the Kalman Filter\'s noise covariance parameters (Q and R) to achieve a balance between responsiveness and smoothness in the tracking output.',
    tags: ['C++', 'OpenCV', 'Computer Vision', 'Kalman Filter'],
    imageUrl: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    repoUrl: 'https://github.com/arignan/'
  },
];

const PROJECTS_PER_PAGE = 6;

interface ProjectsProps {
  onProjectSelect: (project: Project) => void;
  onShowDetailPage: (project: Project) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onProjectSelect, onShowDetailPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isGridAnimating, setIsGridAnimating] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const allTags = useMemo(() => ['All', ...new Set(projectsData.flatMap(p => p.tags))], []);

  const filteredBySearch = useMemo(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    if (!lowercasedTerm) return projectsData;
    return projectsData.filter(project =>
      project.title.toLowerCase().includes(lowercasedTerm) ||
      project.description.toLowerCase().includes(lowercasedTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
    );
  }, [searchTerm]);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') return filteredBySearch;
    return filteredBySearch.filter(project => project.tags.includes(activeTag));
  }, [activeTag, filteredBySearch]);
  
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(startIndex, startIndex + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);
  
  const runAnimation = (callback: () => void) => {
    if (gridRef.current) {
      setIsGridAnimating(true);
      gridRef.current.classList.add('grid-fade-out');
      setTimeout(() => {
        callback();
        gridRef.current?.classList.remove('grid-fade-out');
        setIsGridAnimating(false);
      }, 200); // Match fade-out duration
    }
  };
  
  const handleTagClick = (tag: string) => {
    runAnimation(() => {
      setActiveTag(tag);
      setCurrentPage(1);
    });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    runAnimation(() => {
        setCurrentPage(page);
    });
    // Scroll to the top of the projects section after page change
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  // Reset page to 1 if search term changes and current page becomes invalid
  useEffect(() => {
    if (currentPage > totalPages) {
        setCurrentPage(1);
    }
  }, [searchTerm, totalPages, currentPage]);


  return (
    <section id="projects" className="py-24 md:py-32 bg-slate-100 dark:bg-slate-900 section-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-black dark:text-white mb-8 tracking-tight">
          Featured Projects
        </h2>
        
        <div className="max-w-xl mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-full py-3 pl-12 pr-4 text-black dark:text-white focus:ring-1 focus:ring-black dark:focus:ring-white focus:outline-none transition-colors"
              aria-label="Search projects"
            />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
              <SearchIcon className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-200
                ${activeTag === tag
                  ? 'bg-black dark:bg-white text-white dark:text-black'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        <div ref={gridRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 grid-fade-in ${isGridAnimating ? 'opacity-0' : 'opacity-100'}`}>
         <div className="stagger-children col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProjects.map((project, index) => (
              <div 
                key={`${project.title}-${index}`}
                onClick={() => onProjectSelect(project)}
                className="bg-slate-100 dark:bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 flex flex-col group cursor-pointer"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {project.imageUrl ? (
                      <img src={project.imageUrl} alt={`Thumbnail for ${project.title}`} className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105" />
                  ) : (
                      <div className="w-full h-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
                          <ImageIcon className="w-16 h-16 text-slate-400 dark:text-slate-500" />
                      </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                      {project.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="bg-white/10 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-black dark:text-white mb-2">{project.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow">{project.description}</p>
                  <div className="mt-6 flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                          e.stopPropagation();
                          onShowDetailPage(project);
                      }}
                      className="flex-grow bg-black dark:bg-white text-white dark:text-black font-semibold text-sm px-4 py-2 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors duration-300 text-center"
                    >
                      View Details
                    </button>
                    <Tooltip text="View on GitHub">
                        <a onClick={(e) => e.stopPropagation()} href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white rounded-full bg-slate-200/60 dark:bg-slate-800/60 transition-colors" aria-label={`View repository for ${project.title} on GitHub`}>
                            <GitHubIcon className="w-5 h-5" />
                        </a>
                    </Tooltip>
                    {project.liveUrl && (
                        <Tooltip text="View Live Demo">
                            <a onClick={(e) => e.stopPropagation()} href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="p-2 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white rounded-full bg-slate-200/60 dark:bg-slate-800/60 transition-colors" aria-label={`View live demo for ${project.title}`}>
                                <ExternalLinkIcon className="w-5 h-5" />
                            </a>
                        </Tooltip>
                    )}
                  </div>
                </div>
              </div>
            ))}
         </div>
          {filteredProjects.length === 0 && (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-500 dark:text-slate-400">No projects found for "{searchTerm || activeTag}". Try another search or filter.</p>
            </div>
          )}
        </div>

        {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-2 mt-16" aria-label="Project pagination">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 hover:text-black dark:hover:text-white transition-colors"
              >
                  <span className="sr-only">Previous</span>
                  <ChevronDownIcon className="w-5 h-5 rotate-90" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 text-sm font-semibold rounded-full transition-colors ${
                          currentPage === page 
                              ? 'bg-black dark:bg-white text-white dark:text-black'
                              : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                      aria-current={currentPage === page ? 'page' : undefined}
                  >
                      {page}
                  </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 disabled:opacity-50 disabled:cursor-not-allowed text-slate-500 hover:text-black dark:hover:text-white transition-colors"
              >
                  <span className="sr-only">Next</span>
                  <ChevronDownIcon className="w-5 h-5 -rotate-90" />
              </button>
            </nav>
        )}
      </div>
    </section>
  );
};

export default Projects;