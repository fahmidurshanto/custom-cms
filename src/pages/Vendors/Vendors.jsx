import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import VendorCard from './VendorCard';
import { motion } from 'framer-motion';


const Vendors = () => {
  const vendors = useLoaderData();
  
  if (!vendors || vendors.length === 0) {
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
        <div className="text-center text-gray-500 mt-4">No vendors found.</div>
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
          Vendors: {vendors.length}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <VendorCard key={vendor._id} vendor={vendor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Vendors;
