import React from 'react';
import { motion } from 'framer-motion';
import { FaBook, FaClock, FaHashtag, FaCheckCircle } from 'react-icons/fa';

const CourseCard = ({ course, index = 0 }) => {
  const { 
    title, 
    code,
    published,
    assignmentDuration,
    createdAt
  } = course;

  // Animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  // Format duration in hours and minutes
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      variants={item}
      initial="hidden"
      animate="show"
      whileHover="hover"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <FaBook className="w-6 h-6" />
            <h2 className="text-xl font-bold truncate max-w-xs">{title}</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            published === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {published === 'Yes' ? 'Published' : 'Draft'}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Course Code */}
          <div className="flex items-center text-gray-700">
            <FaHashtag className="w-4 h-4 mr-2 text-indigo-500" />
            <span className="font-medium">Course Code:</span>
            <span className="ml-2 px-2 py-0.5 bg-gray-100 rounded text-sm">{code}</span>
          </div>

          {/* Assignment Duration */}
          <div className="flex items-center text-gray-700">
            <FaClock className="w-4 h-4 mr-2 text-amber-500" />
            <span className="font-medium">Assignment Duration:</span>
            <span className="ml-2">{formatDuration(assignmentDuration)}</span>
          </div>

          {/* Created At */}
          <div className="flex items-center text-gray-500 text-sm">
            <FaCheckCircle className="w-4 h-4 mr-2 text-green-500" />
            <span>Added on {formatDate(createdAt)}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
