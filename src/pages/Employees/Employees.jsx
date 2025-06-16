import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { BsArrow90DegLeft } from 'react-icons/bs';
import EmployeeCard from './EmployeeCard';

const Employees = () => {
  const employees = useLoaderData();
  
  if (!employees || employees.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button>
            <Link to="/" className="btn btn-primary flex items-center gap-2 text-white bg-black py-2 px-4 rounded-md">
              <BsArrow90DegLeft /> Back to home
            </Link>
          </button>
          <div className="text-center text-gray-500 mt-4">No employees found.</div>
        </div>
      </div>
    );
  }

  // Group employees by status
  const activeEmployees = employees.filter(emp => emp.status === 'Live');
  const inactiveEmployees = employees.filter(emp => emp.status !== 'Live');

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
            Employees: <span className="text-blue-600">{employees.length}</span>
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({activeEmployees.length} active, {inactiveEmployees.length} inactive)
            </span>
          </h1>
        </div>
        
        {/* Active Employees */}
        {activeEmployees.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Active Employees ({activeEmployees.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeEmployees.map((employee, index) => (
                <EmployeeCard key={employee._id} employee={employee} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Inactive Employees */}
        {inactiveEmployees.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-gray-200">
              Inactive Employees ({inactiveEmployees.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveEmployees.map((employee, index) => (
                <EmployeeCard key={employee._id} employee={employee} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
