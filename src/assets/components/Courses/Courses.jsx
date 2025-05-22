import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  Dialog,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";

const Courses = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editCourse, setEditCourse] = useState(null);

  // Fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("https://custom-cms-backend.vercel.app/courses");
        setCourses(data);
      } catch (error) {
        toast.error("Failed to fetch courses", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
    fetchCourses();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      title: form.title.value,
      code: form.code.value,
      published: form.published.value,
      assignmentDuration: form.assignmentDuration.value
    };

    try {
      if (editCourse) {
        await axios.put(`https://custom-cms-backend.vercel.app/courses/${editCourse._id}`, formData);
        toast.success("Course updated successfully", { position: "top-right", autoClose: 3000 });
      } else {
        await axios.post("https://custom-cms-backend.vercel.app/courses", formData);
        toast.success("Course added successfully", { position: "top-right", autoClose: 3000 });
      }

      const { data } = await axios.get("https://custom-cms-backend.vercel.app/courses");
      setCourses(data);
      setIsModalOpen(false);
      setEditCourse(null);
      if (!editCourse) setCurrentPage(1);
    } catch (error) {
      toast.error(error.message, { position: "top-right", autoClose: 5000 });
    }
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Delete this course?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={async () => {
              try {
                await axios.delete(`https://custom-cms-backend.vercel.app/courses/${id}`);
                const { data } = await axios.get("https://custom-cms-backend.vercel.app/courses");
                setCourses(data);
                toast.dismiss();
                toast.success("Course deleted", { position: "top-right", autoClose: 3000 });
              } catch (error) {
                toast.error(error.message, { position: "top-right", autoClose: 5000 });
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
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  // Pagination and filtering
  const filteredCourses = courses.filter(course =>
    Object.values(course).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredCourses.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredCourses.length / recordsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <ToastContainer />
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
            onClick={() => setIsModalOpen(true)}
          >
            <FaPlus /> Add New
          </motion.button>
        </div>

        <div className="mt-4 flex justify-between gap-4">
          <select
            className="border p-2 rounded"
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
          <input 
            type="text" 
            placeholder="Search..." 
            className="border p-2 rounded flex-grow" 
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <motion.table 
          className="w-full mt-4 border-collapse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Course Title</th>
              <th className="p-2 text-left">Code</th>
              <th className="p-2 text-center">Published</th>
              <th className="p-2 text-center">Assignment Duration</th>
              <th className="p-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((course, index) => (
              <motion.tr 
                key={course._id} 
                className="border-b hover:bg-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <td className="p-2 text-left align-middle">{course.title}</td>
                <td className="p-2 text-left align-middle">{course.code}</td>
                <td className="p-2 text-center align-middle">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    course.published === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {course.published}
                  </span>
                </td>
                <td className="p-2 text-center align-middle">{course.assignmentDuration} days</td>
                <td className="p-2 text-center align-middle">
                  <div className="flex gap-2 justify-center">
                    <motion.button 
                      className="text-blue-500" 
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        setEditCourse(course);
                        setIsModalOpen(true);
                      }}
                    >
                      <FaEdit />
                    </motion.button>
                    <motion.button 
                      className="text-red-500" 
                      whileHover={{ scale: 1.1 }}
                      onClick={() => confirmDelete(course._id)}
                    >
                      <FaTrash />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCourses.length)} of {filteredCourses.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-blue-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog>
          {({ close }) => (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-md mx-4 md:mx-0"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <div className="p-6">
                  <Heading className="text-xl font-bold mb-4">
                    {editCourse ? "Edit Course" : "Add New Course"}
                  </Heading>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Course Title *</Label>
                      <Input
                        name="title"
                        defaultValue={editCourse?.title || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Course Code *</Label>
                      <Input
                        name="code"
                        defaultValue={editCourse?.code || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Assignment Duration (Days) *</Label>
                      <Input
                        type="number"
                        name="assignmentDuration"
                        defaultValue={editCourse?.assignmentDuration || ""}
                        className="w-full p-2 border rounded-lg"
                        placeholder="Days"
                        required
                      />
                    </TextField>

                    <div className="space-y-2">
                      <Label className="block mb-1 font-medium">Published *</Label>
                      <div className="flex gap-4">
                        {["Yes", "No"].map(option => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="published"
                              value={option}
                              required
                              defaultChecked={editCourse?.published === option}
                              className="w-4 h-4"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        onPress={() => {
                          close();
                          setEditCourse(null);
                        }}
                        className="px-4 py-2 border rounded-lg"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        {editCourse ? "Save Changes" : "Add Course"}
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

export default Courses;