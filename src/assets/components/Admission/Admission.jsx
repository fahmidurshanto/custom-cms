import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Admission = () => {
  const [formData, setFormData] = useState({
    admissionDate: "",
    studentName: "",
    contact: "",
    email: "",
    address: "",
    city: "",
    postcode: "",
    gender: "",
    status: "",
    batchNo: "",
    vendor: "",
    location: "",
    bookedBy: "",
    courseType: "",
    assignmentStatus: "",
    assignmentDate: "",
    note: "",
    admissionType: "",
    paymentSlots: "",
    courseFee: "",
    discount: "",
    totalPaid: "",
    received: "",
    refund: "",
    balanceDue: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Data:", formData);
    axios.post("https://custom-cms-backend.vercel.app/students", formData)
    .then(data => {
      if(data.data.insertedId){
        toast.success("New admission created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // Reset form after successful submission
        setFormData({
          admissionDate: "",
          studentName: "",
          contact: "",
          email: "",
          address: "",
          city: "",
          postcode: "",
          gender: "",
          status: "",
          batchNo: "",
          vendor: "",
          location: "",
          bookedBy: "",
          courseType: "",
          assignmentStatus: "",
          assignmentDate: "",
          note: "",
          admissionType: "",
          paymentSlots: "",
          courseFee: "",
          discount: "",
          totalPaid: "",
          received: "",
          refund: "",
          balanceDue: ""
        });
      }
    })
    .catch(err => {
      toast.error(`Error: ${err.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    })
  };

  return (
    <>
      <ToastContainer />
      <motion.div
        className="flex items-center justify-start min-h-screen w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="bg-white p-14 rounded-lg shadow-lg mx-auto w-full"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.h2
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-3xl font-bold mb-6 text-center text-gray-800">Admission Form</motion.h2>
          <form onSubmit={handleSubmit}>
            {/* Admission Date & Student Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="admissionDate" className="block text-sm font-medium text-gray-700">
                  Admission Date
                </label>
                <input
                  type="date"
                  id="admissionDate"
                  name="admissionDate"
                  value={formData.admissionDate}
                  onChange={handleChange}
                  className="cursor-pointer mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                  Student Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter student name"
                  required
                />
              </div>
            </div>

            {/* Contact & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter contact number"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            {/* Address Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                  Postcode
                </label>
                <input
                  type="text"
                  id="postcode"
                  name="postcode"
                  value={formData.postcode}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter postcode"
                  required
                />
              </div>
            </div>

            {/* Gender & Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Batch & Vendor */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="batchNo" className="block text-sm font-medium text-gray-700">
                  Batch No
                </label>
                <select
                  id="batchNo"
                  name="batchNo"
                  value={formData.batchNo}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select batch number</option>
                  <option value="Batch 1">Batch 1</option>
                  <option value="Batch 2">Batch 2</option>
                  <option value="Batch 3">Batch 3</option>
                  <option value="Batch 4">Batch 4</option>
                  <option value="Batch 5">Batch 5</option>
                </select>
              </div>
              <div>
                <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">
                  Vendor
                </label>
                <input
                  type="text"
                  id="vendor"
                  name="vendor"
                  value={formData.vendor}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter vendor"
                  required
                />
              </div>
            </div>

            {/* Location & Booked By */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Enter location"
                  required
                />
              </div>
              <div>
                <label htmlFor="bookedBy" className="block text-sm font-medium text-gray-700">
                  Booked By
                </label>
                <select
                  id="bookedBy"
                  name="bookedBy"
                  value={formData.bookedBy}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="Phone">Phone</option>
                  <option value="Online">Online</option>
                  <option value="Face to Face">Face to Face</option>
                  <option value="Invoice">Invoice</option>
                </select>
              </div>
            </div>

            {/* Course Type */}
            <div className="mb-6">
              <label htmlFor="courseType" className="block text-sm font-medium text-gray-700">
                Course Type
              </label>
              <select
                id="courseType"
                name="courseType"
                value={formData.courseType}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              >
                <option value="Class Based">Class Based</option>
                <option value="Online / Distance Learning">Online / Distance Learning</option>
                <option value="Blended Learning">Blended Learning</option>
              </select>
            </div>

            {/* Assignment Status & Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <label htmlFor="assignmentStatus" className="block text-sm font-medium text-gray-700">
                  Assignment Status
                </label>
                <select
                  id="assignmentStatus"
                  name="assignmentStatus"
                  value={formData.assignmentStatus}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                >
                  <option value="">Select status</option>
                  <option value="Pending">Pending</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div>
                <label htmlFor="assignmentDate" className="block text-sm font-medium text-gray-700">
                  Assignment Date
                </label>
                <input
                  type="date"
                  id="assignmentDate"
                  name="assignmentDate"
                  value={formData.assignmentDate}
                  onChange={handleChange}
                  className="cursor-pointer mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Note */}
            <div className="mb-6">
              <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                Note
              </label>
              <textarea
                id="note"
                name="note"
                value={formData.note}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Enter any additional notes"
                rows="3"
              />
            </div>

            {/* Payment Information */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="admissionType" className="block text-sm font-medium text-gray-700">
                    Admission Type
                  </label>
                  <select
                    id="admissionType"
                    name="admissionType"
                    value={formData.admissionType}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  >
                    <option value="">Select admission type</option>
                    <option value="General">General</option>
                    <option value="Price Plan">Price Plan</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="paymentSlots" className="block text-sm font-medium text-gray-700">
                    Payment Slots
                  </label>
                  <input
                    type="text"
                    id="paymentSlots"
                    name="paymentSlots"
                    value={formData.paymentSlots}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter payment slots"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="courseFee" className="block text-sm font-medium text-gray-700">
                    Course Fee
                  </label>
                  <input
                    type="number"
                    id="courseFee"
                    name="courseFee"
                    value={formData.courseFee}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter course fee"
                  />
                </div>
                <div>
                  <label htmlFor="discount" className="block text-sm font-medium text-gray-700">
                    Discount
                  </label>
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={formData.discount}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter discount"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="totalPaid" className="block text-sm font-medium text-gray-700">
                    Total Paid
                  </label>
                  <input
                    type="number"
                    id="totalPaid"
                    name="totalPaid"
                    value={formData.totalPaid}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter total paid"
                  />
                </div>
                <div>
                  <label htmlFor="received" className="block text-sm font-medium text-gray-700">
                    Received
                  </label>
                  <input
                    type="number"
                    id="received"
                    name="received"
                    value={formData.received}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter amount received"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="refund" className="block text-sm font-medium text-gray-700">
                    Refund
                  </label>
                  <input
                    type="number"
                    id="refund"
                    name="refund"
                    value={formData.refund}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter refund amount"
                  />
                </div>
                <div>
                  <label htmlFor="balanceDue" className="block text-sm font-medium text-gray-700">
                    Balance Due
                  </label>
                  <input
                    type="number"
                    id="balanceDue"
                    name="balanceDue"
                    value={formData.balanceDue}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter balance due"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit Admission
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Admission;