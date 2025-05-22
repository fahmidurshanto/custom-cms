import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Dialog, Heading, Input, Label, Modal, TextField } from "react-aria-components";

const CertificationDispatch = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editCertification, setEditCertification] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [coursesError, setCoursesError] = useState(null);

  // Fetch certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await axios.get("https://custom-cms-backend.vercel.app/certifications");
        setCertifications(data);
      } catch (error) {
        toast.error("Failed to fetch certifications");
      }
    };
    fetchCertifications();
  }, []);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("https://custom-cms-backend.vercel.app/courses");
        setCourses(data);
        setLoadingCourses(false);
      } catch (error) {
        setCoursesError(error.message);
        setLoadingCourses(false);
        toast.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      semiDate: form.semiDate.value,
      name: form.name.value,
      doorNumber: form.doorNumber.value,
      courseName: form.courseName.value
    };

    try {
      if (editCertification) {
        await axios.put(`https://custom-cms-backend.vercel.app/certifications/${editCertification._id}`, formData);
        toast.success("Certification updated successfully");
      } else {
        await axios.post("https://custom-cms-backend.vercel.app/certifications", formData);
        toast.success("Certification added successfully");
      }

      const { data } = await axios.get("https://custom-cms-backend.vercel.app/certifications");
      setCertifications(data);
      setIsModalOpen(false);
      setEditCertification(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Delete this certification?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={async () => {
              try {
                await axios.delete(`https://custom-cms-backend.vercel.app/certifications/${id}`);
                const { data } = await axios.get("https://custom-cms-backend.vercel.app/certifications");
                setCertifications(data);
                toast.dismiss();
                toast.success("Certification deleted");
              } catch (error) {
                toast.error(error.message);
              }
            }}
          >
            Confirm
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
        </div>
      </div>,
      { position: "top-right", autoClose: false }
    );
  };

  // Pagination and filtering
  const filteredCertifications = certifications.filter(certification =>
    Object.values(certification).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
  ));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCertifications.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredCertifications.length / recordsPerPage);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm min-h-screen">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Certification Dispatch</h1>
      </div>

      <div className="flex justify-between items-center mb-4 gap-4">
        <select
          className="border p-2 rounded text-sm"
          value={recordsPerPage}
          onChange={(e) => {
            setRecordsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
        >
          {[10, 20, 50].map(option => (
            <option key={option} value={option}>{option} per page</option>
          ))}
        </select>
        
        <div className="flex gap-2 flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded flex-grow text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          <motion.button
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2 text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className="text-base" /> Add New
          </motion.button>
        </div>
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="overflow-x-auto"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Semi Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Door Number</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Name</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((certification) => (
              <motion.tr
                key={certification._id}
                variants={rowVariants}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-sm text-gray-900">{certification.semiDate}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{certification.name}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{certification.doorNumber}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{certification.courseName}</td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <motion.button
                      className="text-blue-500 hover:text-blue-700"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        setEditCertification(certification);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </motion.button>
                    <motion.button
                      className="text-red-500 hover:text-red-700"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => confirmDelete(certification._id)}
                    >
                      <FiTrash2 />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-gray-700">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCertifications.length)} of {filteredCertifications.length} entries
        </span>
        <div className="flex gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog>
          {({ close }) => (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-md"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <div className="p-6">
                  <Heading className="text-xl font-bold mb-4">
                    {editCertification ? "Edit Certification" : "Add Certification"}
                  </Heading>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Sent Date (DD/MM/YYYY) *</Label>
                      <Input
                        name="semiDate"
                        defaultValue={editCertification?.semiDate || ""}
                        className="w-full p-2 border rounded-lg"
                        placeholder="DD/MM/YYYY"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Name *</Label>
                      <Input
                        name="name"
                        defaultValue={editCertification?.name || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Door Number (Address) *</Label>
                      <Input
                        name="doorNumber"
                        defaultValue={editCertification?.doorNumber || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Course Name *</Label>
                      <select
                        name="courseName"
                        defaultValue={editCertification?.courseName || ""}
                        className="w-full p-2 border rounded-lg bg-white"
                        required
                        disabled={loadingCourses || !!coursesError}
                      >
                        <option value="">Select Course</option>
                        {loadingCourses ? (
                          <option disabled>Loading courses...</option>
                        ) : coursesError ? (
                          <option disabled>Error loading courses</option>
                        ) : (
                          courses.map((course) => (
                            <option 
                              key={course._id} 
                              value={course.title}
                              selected={editCertification?.courseName === course.title}
                            >
                              {course.title}
                            </option>
                          ))
                        )}
                      </select>
                    </TextField>

                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        onPress={() => {
                          close();
                          setEditCertification(null);
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        {editCertification ? "Save Changes" : "Add Certification"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </Dialog>
      </Modal>
    </div>
  );
};

export default CertificationDispatch;