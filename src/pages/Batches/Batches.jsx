import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import BatchCard from './BatchCard';

const Batches = () => {
  const batches = useLoaderData();
  
  if (!batches || batches.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button>
            <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
              <BsArrow90DegLeft /> Back to home
            </Link>
          </button>
          <div className="text-center text-gray-500 mt-4">No batches found.</div>
        </div>
      </div>
    );
  }

  // Categorize batches by status
  const now = new Date();
  const upcomingBatches = batches.filter(batch => new Date(batch.startDate) > now);
  const ongoingBatches = batches.filter(batch => 
    new Date(batch.startDate) <= now && new Date(batch.endDate) >= now
  );
  const completedBatches = batches.filter(batch => new Date(batch.endDate) < now);

  // Sort batches by start date
  const sortByDate = (a, b) => new Date(a.startDate) - new Date(b.startDate);
  upcomingBatches.sort(sortByDate);
  ongoingBatches.sort(sortByDate);
  completedBatches.sort(sortByDate).reverse(); // Show most recent first

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <button>
            <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
              <BsArrow90DegLeft /> Back to home
            </Link>
          </button>
          <h1 className="text-3xl font-bold text-gray-800">
            Batches: <span className="text-indigo-600">{batches.length}</span>
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({ongoingBatches.length} ongoing, {upcomingBatches.length} upcoming, {completedBatches.length} completed)
            </span>
          </h1>
        </div>
        
        {/* Ongoing Batches */}
        {ongoingBatches.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
              Ongoing Batches ({ongoingBatches.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ongoingBatches.map((batch, index) => (
                <BatchCard key={batch._id} batch={batch} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Batches */}
        {upcomingBatches.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              Upcoming Batches ({upcomingBatches.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingBatches.map((batch, index) => (
                <BatchCard key={batch._id} batch={batch} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Batches */}
        {completedBatches.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200 flex items-center">
              <span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>
              Completed Batches ({completedBatches.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedBatches.map((batch, index) => (
                <BatchCard key={batch._id} batch={batch} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Batches;
