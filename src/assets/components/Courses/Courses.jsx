import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const Course = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <motion.div 
        className="bg-white shadow-lg rounded-lg p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center pb-4 border-b">
          <h2 className="text-xl font-semibold">Subjects/Course</h2>
          <motion.button 
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add New
          </motion.button>
        </div>

        <div className="mt-4 flex justify-between">
          <select className="border p-2 rounded">
            <option>10</option>
            <option>20</option>
            <option>50</option>
          </select>
          <input type="text" placeholder="Search..." className="border p-2 rounded" />
        </div>

        <motion.table 
          className="w-full mt-4 border-collapse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">Course Title</th>
              <th className="p-2">Code</th>
              <th className="p-2">Published</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <motion.tr 
                key={index} 
                className="border-b hover:bg-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="p-2">Sample Course {index + 1}</td>
                <td className="p-2">CODE{index + 1}</td>
                <td className="p-2">Yes</td>
                <td className="p-2 flex gap-2">
                  <motion.button className="text-blue-500" whileHover={{ scale: 1.1 }}>
                    <FaEdit />
                  </motion.button>
                  <motion.button className="text-red-500" whileHover={{ scale: 1.1 }}>
                    <FaTrash />
                  </motion.button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </div>
  );
};

export default Course;
