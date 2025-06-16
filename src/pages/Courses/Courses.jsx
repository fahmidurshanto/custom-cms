import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import CourseCard from './CourseCard';

const Courses = () => {
  const courses = useLoaderData();
  
  if (!courses || courses.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <button>
          <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
            <BsArrow90DegLeft /> Back to home
          </Link>
        </button>
        <div className="text-center text-gray-500 mt-4">No courses found.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button>
            <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
              <BsArrow90DegLeft /> Back to home
            </Link>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Courses: <span className="text-indigo-600">{courses.length}</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <CourseCard key={course._id} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
