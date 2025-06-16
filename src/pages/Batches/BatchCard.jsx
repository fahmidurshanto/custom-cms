import React from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaBook, FaCheckCircle, FaClock } from 'react-icons/fa';

const BatchCard = ({ batch, index = 0 }) => {
  const { 
    batchNo,
    course,
    startDate,
    endDate,
    published,
    createdAt
  } = batch;

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

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate batch duration in days
  const getDuration = (start, end) => {
    if (!start || !end) return 'N/A';
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
    return `${diffDays} day${diffDays !== 1 ? 's' : ''}`;
  };

  // Check if batch is upcoming, ongoing, or completed
  const getBatchStatus = () => {
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (today < start) {
      return { text: 'Upcoming', color: 'bg-blue-100 text-blue-800' };
    } else if (today >= start && today <= end) {
      return { text: 'Ongoing', color: 'bg-green-100 text-green-800' };
    } else {
      return { text: 'Completed', color: 'bg-gray-100 text-gray-800' };
    }
  };

  const batchStatus = getBatchStatus();

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
          <div>
            <h2 className="text-xl font-bold truncate max-w-xs">{batchNo}</h2>
            <p className="text-indigo-100 text-sm mt-1">{course}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${batchStatus.color}`}>
            {batchStatus.text}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Batch Dates */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Batch Schedule</h3>
          <div className="space-y-2">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-indigo-500" />
              <div>
                <p className="font-medium">Starts: {formatDate(startDate)}</p>
                <p className="text-sm text-gray-500">Ends: {formatDate(endDate)}</p>
              </div>
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="w-4 h-4 mr-2 text-amber-500" />
              <span>Duration: {getDuration(startDate, endDate)}</span>
            </div>
          </div>
        </div>

        {/* Status and Published */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="flex items-center">
            <FaCheckCircle className={`w-4 h-4 mr-2 ${
              published === 'Yes' ? 'text-green-500' : 'text-gray-400'
            }`} />
            <span className="text-sm">
              {published === 'Yes' ? 'Published' : 'Draft'}
            </span>
          </div>
          <div className="text-right text-sm text-gray-500">
            Created: {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BatchCard;
