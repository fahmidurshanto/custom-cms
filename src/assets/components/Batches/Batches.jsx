import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

const Batches = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  // Mock data - you'll replace this with your actual data
  const batches = [
    {
      id: 1,
      batchNo: "First Aid: 13th March 2025",
      course: "First Aid Course",
      date: "13/03/2025 To 13/03/2025",
      published: true,
    },
    {
      id: 2,
      batchNo: "CM: 13th March 2025",
      course: "Conflict Management",
      date: "13/03/2025 To 13/03/2025",
      published: true,
    },
    {
      id: 3,
      batchNo: "PI: 14th-15th March 2025",
      course: "Physical Intervention (Trainer Course)",
      date: "14/03/2025 To 15/03/2025",
      published: true,
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Batch(s)</h1>
        <h2 className="text-xl font-semibold text-gray-600">Batch(s)</h2>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">10 records per page</p>
        {/* Add pagination controls here if needed */}
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Batch No.#
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Published
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {batches.map((batch) => (
                <motion.tr
                  key={batch.id}
                  variants={rowVariants}
                  whileHover={{ scale: 1.01 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {batch.batchNo}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {batch.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <FiCheck className="mr-1" />
                      Yes
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      ✓
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="mt-6 border-t pt-4">
        <p className="text-sm text-gray-500">AET: 24th-26th March 2025</p>
      </div>
    </div>
  );
};

export default Batches;