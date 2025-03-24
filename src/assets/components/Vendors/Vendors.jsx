import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash } from "lucide-react";

const Vendor = () => {
  const [search, setSearch] = useState("");

  // Placeholder data, replace with actual data
  const vendors = [
    { id: 1, logo: "", name: "Advance Training Academy", published: "Yes" },
    { id: 2, logo: "", name: "BS Security", published: "Yes" },
    { id: 3, logo: "", name: "Kings Training Academy", published: "Yes" },
    { id: 4, logo: "", name: "NST", published: "Yes" },
    { id: 5, logo: "", name: "West Academy", published: "Yes" },
  ];

  const filteredVendors = vendors.filter((vendor) =>
    vendor.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>
      <div className="flex justify-between mb-4">
        <select className="border p-2 rounded">
          <option>10 records per page</option>
        </select>
        <input
          type="text"
          placeholder="Search..."
          className="border p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2">Logo</th>
            <th className="p-2">Vendor</th>
            <th className="p-2">Published</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredVendors.map((vendor) => (
            <motion.tr
              key={vendor.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="border-b"
            >
              <td className="p-2"><img src={vendor.logo} alt="" className="w-10 h-10" /></td>
              <td className="p-2">{vendor.name}</td>
              <td className="p-2">{vendor.published}</td>
              <td className="p-2 flex gap-2">
                <button className="bg-blue-500 text-white p-2 rounded flex items-center">
                  <Pencil size={16} />
                </button>
                <button className="bg-red-500 text-white p-2 rounded flex items-center">
                  <Trash size={16} />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
};

export default Vendor;
