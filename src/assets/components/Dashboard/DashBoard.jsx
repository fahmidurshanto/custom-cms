import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';

const DashBoard = () => {
    const [students, setStudents] = useState([]);
    useEffect(() =>{
        axios.get("https://custom-cms-backend.vercel.app/students")
        .then(res => setStudents(res.data))
        .catch(err => console.log(err))
    })
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            <h1 className='text-2xl font-bold'>Dashboard</h1>
            <div>
                <button className='bg-amber-600 text-white p-4  rounded-md'><Link to="/students" className='text-5xl'>Students: {students.length}</Link></button>
            </div>
        </div>
    );
};

export default DashBoard;