import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import LocationCard from './LocationCard';

export { loader } from './locationsLoader';

const Locations = () => {
  const locations = useLoaderData();
  
  if (!locations || locations.length === 0) {
    return (
      <motion.div 
        className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <button>
          <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
            <BsArrow90DegLeft /> Back to home
          </Link>
        </button>
        <div className="text-center text-gray-500 mt-4">No locations found.</div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button>
        <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md mb-8">
          <BsArrow90DegLeft /> Back to home
        </Link>
      </button>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Locations: {locations.length}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <LocationCard key={location._id} location={location} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Locations;
