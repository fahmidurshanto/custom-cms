import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const DashBoard = () => {
    const students = useLoaderData();
    console.log(students)
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <div>
                <button className='bg-amber-600 text-white p-4  rounded-md'><Link to="/students" className='text-5xl'>Students</Link></button>
            </div>
        </div>
    );
};

export default DashBoard;