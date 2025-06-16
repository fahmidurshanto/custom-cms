import React from 'react';
import { motion } from 'framer-motion';
import { FaCertificate, FaUserGraduate, FaMapMarkerAlt, FaBook, FaCalendarAlt } from 'react-icons/fa';

const CertificationCard = ({ certification, index = 0 }) => {
  const { 
    name,
    courseName,
    doorNumber,
    semiDate,
    createdAt,
    updatedAt
  } = certification;

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
    
    // First try to parse as DD/MM/YYYY (semiDate format)
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    
    // Otherwise try to parse as ISO string
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate time since issued
  const getTimeSinceIssued = (dateString) => {
    if (!dateString) return '';
    
    let date;
    if (dateString.includes('/')) {
      const [day, month, year] = dateString.split('/');
      date = new Date(year, month - 1, day);
    } else {
      date = new Date(dateString);
    }
    
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `Issued ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Issued ${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `Issued ${years} year${years !== 1 ? 's' : ''} ago`;
    }
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
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-700 opacity-10 -mr-8 -mt-8 rounded-full"></div>
        <div className="flex items-center space-x-4 relative z-10">
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
            <FaCertificate className="w-6 h-6 text-yellow-300" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Certificate of Completion</h2>
            <p className="text-blue-100 text-sm">{courseName}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Recipient Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Recipient</h3>
          <div className="flex items-center text-gray-700">
            <FaUserGraduate className="w-4 h-4 mr-2 text-blue-500" />
            <span className="font-medium">{name}</span>
          </div>
        </div>

        {/* Course Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Course Details</h3>
          <div className="space-y-2">
            <div className="flex items-center">
              <FaBook className="w-4 h-4 mr-2 text-green-500" />
              <span>{courseName}</span>
            </div>
            <div className="flex items-center">
              <FaCalendarAlt className="w-4 h-4 mr-2 text-amber-500" />
              <span>Completed: {formatDate(semiDate)}</span>
            </div>
            {doorNumber && (
              <div className="flex items-start">
                <FaMapMarkerAlt className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                <span className="text-sm text-gray-600">{doorNumber}</span>
              </div>
            )}
          </div>
        </div>

        {/* Metadata */}
        <div className="pt-2 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
          <span title={`Created: ${formatDate(createdAt)}`}>
            {getTimeSinceIssued(createdAt)}
          </span>
          {updatedAt !== createdAt && (
            <span title={`Last updated: ${formatDate(updatedAt)}`}>
              Updated {getTimeSinceIssued(updatedAt).toLowerCase()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default CertificationCard;
