import React from 'react';
import { motion } from 'framer-motion';

const LocationCard = ({ location }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 h-full flex flex-col"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
    >
      <h2 className="text-xl font-bold text-gray-800 mb-3">
        {location.location}
      </h2>
      <div className="space-y-2 text-gray-600">
        <p className="border-b pb-2">
          <span className="font-medium">Address 1:</span> {location.address1}
        </p>
        {location.address2 && (
          <p className="border-b pb-2">
            <span className="font-medium">Address 2:</span> {location.address2}
          </p>
        )}
        <p className="pt-2">
          <span className="font-medium">Status: </span>
          <span 
            className={`ml-1 px-2 py-1 text-xs rounded-full ${
              location.published === 'Yes' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {location.published === 'Yes' ? 'Published' : 'Unpublished'}
          </span>
        </p>
      </div>
    </motion.div>
  );
};

export default LocationCard;
