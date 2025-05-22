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
        hover: { scale: 1.05, transition: { type: 'spring', stiffness: 300 } },
        tap: { scale: 0.95 }
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
        <div className='min-h-screen p-8'>
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className='text-3xl font-bold text-center mb-8'
            >
                Dashboard Overview
            </motion.h1>
            
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            >
                {/* Students Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/students" className='dashboard-card bg-blue-500'>
                        <h3 className='text-xl font-semibold'>Students</h3>
                        <p className='text-4xl font-bold'>{data.students}</p>
                    </Link>
                </motion.div>

                {/* Locations Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/locations" className='dashboard-card bg-green-500'>
                        <h3 className='text-xl font-semibold'>Locations</h3>
                        <p className='text-4xl font-bold'>{data.locations}</p>
                    </Link>
                </motion.div>

                {/* Vendors Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/vendors" className='dashboard-card bg-yellow-500'>
                        <h3 className='text-xl font-semibold'>Vendors</h3>
                        <p className='text-4xl font-bold'>{data.vendors}</p>
                    </Link>
                </motion.div>

                {/* Employees Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/employees" className='dashboard-card bg-purple-500'>
                        <h3 className='text-xl font-semibold'>Employees</h3>
                        <p className='text-4xl font-bold'>{data.employees}</p>
                    </Link>
                </motion.div>

                {/* Courses Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/courses" className='dashboard-card bg-pink-500'>
                        <h3 className='text-xl font-semibold'>Courses</h3>
                        <p className='text-4xl font-bold'>{data.courses}</p>
                    </Link>
                </motion.div>

                {/* Batches Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/batches" className='dashboard-card bg-indigo-500'>
                        <h3 className='text-xl font-semibold'>Batches</h3>
                        <p className='text-4xl font-bold'>{data.batches}</p>
                    </Link>
                </motion.div>

                {/* Certifications Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/certifications" className='dashboard-card bg-orange-500'>
                        <h3 className='text-xl font-semibold'>Certifications</h3>
                        <p className='text-4xl font-bold'>{data.certifications}</p>
                    </Link>
                </motion.div>

                {/* E-Marketing Card */}
                <motion.div
                    variants={cardVariants}
                    whileHover="hover"
                    whileTap="tap"
                >
                    <Link to="/e-marketing" className='dashboard-card bg-red-500'>
                        <h3 className='text-xl font-semibold'>E-Marketing</h3>
                        <p className='text-4xl font-bold'>{data.emails}</p>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default DashBoard;