import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import { FaSearch, FaFilter } from 'react-icons/fa';
import CertificationCard from './CertificationCard';

const Certifications = () => {
  const certifications = useLoaderData();
  
  if (!certifications || certifications.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button>
            <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
              <BsArrow90DegLeft /> Back to home
            </Link>
          </button>
          <div className="text-center text-gray-500 mt-4">No certifications found.</div>
        </div>
      </div>
    );
  }

  // Group certifications by course name
  const certificationsByCourse = certifications.reduce((acc, cert) => {
    const course = cert.courseName || 'Uncategorized';
    if (!acc[course]) {
      acc[course] = [];
    }
    acc[course].push(cert);
    return acc;
  }, {});

  // Sort courses by name
  const sortedCourses = Object.keys(certificationsByCourse).sort();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <button>
              <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
                <BsArrow90DegLeft /> Back to home
              </Link>
            </button>
            <h1 className="text-3xl font-bold text-gray-800">
              Certificates: <span className="text-blue-600">{certifications.length}</span>
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({sortedCourses.length} {sortedCourses.length === 1 ? 'course' : 'courses'})
              </span>
            </h1>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search certificates..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FaFilter className="-ml-1 mr-2 h-4 w-4 text-gray-400" />
              Filter
            </button>
          </div>
        </div>
        
        {/* Certificates by Course */}
        <div className="space-y-10">
          {sortedCourses.map((course) => (
            <div key={course} className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-700 border-b border-gray-200 pb-2">
                {course} <span className="text-sm font-normal text-gray-500">({certificationsByCourse[course].length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certificationsByCourse[course].map((cert, index) => (
                  <CertificationCard 
                    key={cert._id} 
                    certification={cert} 
                    index={index} 
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certifications;
