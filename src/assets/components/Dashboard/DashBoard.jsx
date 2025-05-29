import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const DashBoard = () => {
    const [data, setData] = useState({
        students: 0,
        locations: 0,
        vendors: 0,
        employees: 0,
        courses: 0,
        batches: 0,
        certifications: 0,
        emails: 0,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const endpoints = [
                    '/students',
                    '/locations',
                    '/vendors',
                    '/employees',
                    '/courses',
                    '/batches',
                    '/certifications',
                    '/e-marketing'
                ];

                const baseURL = 'https://custom-cms-backend.vercel.app';
                
                const responses = await Promise.all(
                    endpoints.map(endpoint => axios.get(baseURL + endpoint))
                );

                setData({
                    students: responses[0].data.length,
                    locations: responses[1].data.length,
                    vendors: responses[2].data.length,
                    employees: responses[3].data.length,
                    courses: responses[4].data.length,
                    batches: responses[5].data.length,
                    certifications: responses[6].data.length,
                    emails: responses[7].data.length,
                    loading: false,
                    error: null
                });

            } catch (error) {
                setData(prev => ({
                    ...prev,
                    loading: false,
                    error: error.message
                }));
            }
        };

        fetchAllData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.05, 
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
            transition: { 
                type: 'spring', 
                stiffness: 300,
                duration: 0.3
            } 
        },
        tap: { scale: 0.98 }
    };

    if (data.loading) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex justify-center items-center h-screen'
        >
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </motion.div>
    );

    if (data.error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex flex-col justify-center items-center h-screen text-red-500 p-4'
        >
            <div className="text-2xl mb-4">⚠️ Error Loading Data</div>
            <div className="bg-red-50 p-4 rounded-lg max-w-md text-center">
                {data.error}
            </div>
            <button 
                className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                onClick={() => window.location.reload()}
            >
                Retry
            </button>
        </motion.div>
    );

    return (
        <div className='min-h-screen p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100'>
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800'
            >
                Dashboard Overview
            </motion.h1>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6'
            >
                {/* Students Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/students" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-blue-400 to-blue-600 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Students</h3>
                        <p className='text-4xl font-bold'>{data.students}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '75%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Locations Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/locations" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Locations</h3>
                        <p className='text-4xl font-bold'>{data.locations}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '60%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Vendors Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/vendors" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-amber-400 to-amber-600 text-gray-800'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Vendors</h3>
                        <p className='text-4xl font-bold'>{data.vendors}</p>
                        <div className="mt-4 h-1 bg-gray-800 bg-opacity-20 rounded-full">
                            <div className="h-full bg-gray-800 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Employees Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/employees" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-violet-500 to-violet-700 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Employees</h3>
                        <p className='text-4xl font-bold'>{data.employees}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '65%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Courses Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/courses" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-rose-400 to-rose-600 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Courses</h3>
                        <p className='text-4xl font-bold'>{data.courses}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '55%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Batches Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/batches" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-indigo-500 to-indigo-700 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Batches</h3>
                        <p className='text-4xl font-bold'>{data.batches}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '70%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* Certifications Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/certifications" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>Certifications</h3>
                        <p className='text-4xl font-bold'>{data.certifications}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '50%' }}></div>
                        </div>
                    </Link>
                </motion.div>

                {/* E-Marketing Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link 
                        to="/e-marketing" 
                        className='block p-6 rounded-2xl shadow-lg transform transition-all duration-300 bg-gradient-to-br from-fuchsia-500 to-fuchsia-700 text-white'
                    >
                        <h3 className='text-xl font-semibold mb-2'>E-Marketing</h3>
                        <p className='text-4xl font-bold'>{data.emails}</p>
                        <div className="mt-4 h-1 bg-white bg-opacity-30 rounded-full">
                            <div className="h-full bg-white rounded-full" style={{ width: '80%' }}></div>
                        </div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DashBoard;