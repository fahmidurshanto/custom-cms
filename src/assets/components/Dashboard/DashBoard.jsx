import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaUserGraduate, FaMapMarkerAlt, FaBuilding, FaUsers, FaBook, FaLayerGroup, FaCertificate, FaEnvelope } from 'react-icons/fa';

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
                staggerChildren: 0.15,
                when: "beforeChildren",
                duration: 0.5
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hover: { 
            scale: 1.03,
            boxShadow: '0 10px 20px rgba(0,0,0,0.12)',
            transition: { type: 'spring', stiffness: 300 }
        },
        tap: { scale: 0.98 }
    };

    if (data.loading) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex justify-center items-center h-screen'
        >
            Loading...
        </motion.div>
    );

    if (data.error) return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='flex justify-center items-center h-screen text-red-500'
        >
            Error: {data.error}
        </motion.div>
    );

    return (
        <div className='min-h-screen p-8 bg-gray-50'>
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-7xl mx-auto mb-12 text-center'
            >
                <h1 className='text-4xl font-bold text-gray-800 mb-4'>Dashboard Overview</h1>
                <p className='text-gray-600 text-lg'>Welcome to your Custom CMS Dashboard</p>
            </motion.div>

            {/* Summary Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='max-w-7xl mx-auto mb-12 p-6 bg-white rounded-xl shadow-lg'
            >
                <h2 className='text-2xl font-semibold text-gray-800 mb-4'>Quick Summary</h2>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                    <div className='p-4 bg-blue-50 rounded-lg'>
                        <p className='text-sm text-blue-600 font-medium'>Total Users</p>
                        <p className='text-2xl font-bold text-blue-800'>{data.students + data.employees}</p>
                    </div>
                    <div className='p-4 bg-green-50 rounded-lg'>
                        <p className='text-sm text-green-600 font-medium'>Active Courses</p>
                        <p className='text-2xl font-bold text-green-800'>{data.courses}</p>
                    </div>
                    <div className='p-4 bg-purple-50 rounded-lg'>
                        <p className='text-sm text-purple-600 font-medium'>Total Batches</p>
                        <p className='text-2xl font-bold text-purple-800'>{data.batches}</p>
                    </div>
                    <div className='p-4 bg-orange-50 rounded-lg'>
                        <p className='text-sm text-orange-600 font-medium'>Certifications</p>
                        <p className='text-2xl font-bold text-orange-800'>{data.certifications}</p>
                    </div>
                </div>
            </motion.div>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto'
            >
                {/* Students Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/students" className='block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-blue-900'>Students</h3>
                            <FaUserGraduate className='text-2xl text-blue-500' />
                        </div>
                        <p className='text-4xl font-bold text-blue-700'>{data.students}</p>
                        <p className='text-sm text-blue-600 mt-2'>Total Registered</p>
                    </Link>
                </motion.div>

                {/* Locations Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/locations" className='block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-green-900'>Locations</h3>
                            <FaMapMarkerAlt className='text-2xl text-green-500' />
                        </div>
                        <p className='text-4xl font-bold text-green-700'>{data.locations}</p>
                        <p className='text-sm text-green-600 mt-2'>Active Centers</p>
                    </Link>
                </motion.div>

                {/* Vendors Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/vendors" className='block p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-yellow-900'>Vendors</h3>
                            <FaBuilding className='text-2xl text-yellow-500' />
                        </div>
                        <p className='text-4xl font-bold text-yellow-700'>{data.vendors}</p>
                        <p className='text-sm text-yellow-600 mt-2'>Partner Companies</p>
                    </Link>
                </motion.div>

                {/* Employees Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/employees" className='block p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-purple-900'>Employees</h3>
                            <FaUsers className='text-2xl text-purple-500' />
                        </div>
                        <p className='text-4xl font-bold text-purple-700'>{data.employees}</p>
                        <p className='text-sm text-purple-600 mt-2'>Team Members</p>
                    </Link>
                </motion.div>

                {/* Courses Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/courses" className='block p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-pink-900'>Courses</h3>
                            <FaBook className='text-2xl text-pink-500' />
                        </div>
                        <p className='text-4xl font-bold text-pink-700'>{data.courses}</p>
                        <p className='text-sm text-pink-600 mt-2'>Available Programs</p>
                    </Link>
                </motion.div>

                {/* Batches Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/batches" className='block p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-indigo-900'>Batches</h3>
                            <FaLayerGroup className='text-2xl text-indigo-500' />
                        </div>
                        <p className='text-4xl font-bold text-indigo-700'>{data.batches}</p>
                        <p className='text-sm text-indigo-600 mt-2'>Active Classes</p>
                    </Link>
                </motion.div>

                {/* Certifications Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/certifications" className='block p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-orange-900'>Certifications</h3>
                            <FaCertificate className='text-2xl text-orange-500' />
                        </div>
                        <p className='text-4xl font-bold text-orange-700'>{data.certifications}</p>
                        <p className='text-sm text-orange-600 mt-2'>Issued Certificates</p>
                    </Link>
                </motion.div>

                {/* E-Marketing Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/e-marketing" className='block p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-xl font-semibold text-red-900'>E-Marketing</h3>
                            <FaEnvelope className='text-2xl text-red-500' />
                        </div>
                        <p className='text-4xl font-bold text-red-700'>{data.emails}</p>
                        <p className='text-sm text-red-600 mt-2'>Email Campaigns</p>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DashBoard;