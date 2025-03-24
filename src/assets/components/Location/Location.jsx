import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Location = () => {
    const [search, setSearch] = useState("");

    return (
        <motion.div 
            className="p-6 bg-gray-100 min-h-screen"
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white p-4 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-4">
                    <select className="p-2 border rounded-lg">
                        <option>10 records per page</option>
                        <option>20 records per page</option>
                    </select>
                    <input 
                        type="text" 
                        placeholder="Search..." 
                        className="p-2 border rounded-lg"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">Add New</button>
                </div>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="p-2 text-left">Location</th>
                            <th className="p-2 text-left">Published</th>
                            <th className="p-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(10)].map((_, index) => (
                            <motion.tr 
                                key={index} 
                                className="border-b hover:bg-gray-100"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <td className="p-2">Location {index + 1}</td>
                                <td className="p-2">{index % 2 === 0 ? "Yes" : "No"}</td>
                                <td className="p-2 flex space-x-2">
                                    <button className="bg-blue-500 text-white p-2 rounded-lg">
                                        <FaEdit />
                                    </button>
                                    <button className="bg-red-500 text-white p-2 rounded-lg">
                                        <FaTrash />
                                    </button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default Location;
