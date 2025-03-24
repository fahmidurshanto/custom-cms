import React from "react";
import { motion } from "framer-motion";

const StudentCard = ({ student }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {student.studentName}
      </h2>
      <div className="space-y-2 text-gray-600">
        <p>
          <span className="font-semibold">Admission Date:</span>{" "}
          {student.admissionDate}
        </p>
        <p>
          <span className="font-semibold">Batch:</span> {student.batchNo}
        </p>
        <p>
          <span className="font-semibold">Course Type:</span>{" "}
          {student.courseType}
        </p>
        <p>
          <span className="font-semibold">Contact:</span> {student.contact}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {student.email}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {student.location}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={`px-2 py-1 rounded-full text-sm ${
              student.status === "Active"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {student.status}
          </span>
        </p>
      </div>
      <div className="mt-4">
        <p className="text-gray-700">
          <span className="font-semibold">Note:</span> {student.note}
        </p>
      </div>
    </motion.div>
  );
};

export default StudentCard;