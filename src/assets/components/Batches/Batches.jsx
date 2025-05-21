import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiCheck, FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
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

const Batches = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [batches, setBatches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editBatch, setEditBatch] = useState(null);

  // Fetch batches
  useEffect(() => {
    const fetchBatches = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/batches");
        setBatches(data);
      } catch (error) {
        toast.error("Failed to fetch batches");
      }
    };
    fetchBatches();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      batchNo: form.batchNo.value,
      course: form.course.value,
      startDate: form.startDate.value,
      endDate: form.endDate.value,
      published: form.published.value
    };

    try {
      if (editBatch) {
        await axios.put(`http://localhost:3000/batches/${editBatch._id}`, formData);
        toast.success("Batch updated successfully");
      } else {
        await axios.post("http://localhost:3000/batches", formData);
        toast.success("Batch added successfully");
      }

      const { data } = await axios.get("http://localhost:3000/batches");
      setBatches(data);
      setIsModalOpen(false);
      setEditBatch(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Delete this batch?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:3000/batches/${id}`);
                const { data } = await axios.get("http://localhost:3000/batches");
                setBatches(data);
                toast.dismiss();
                toast.success("Batch deleted");
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
  const filteredBatches = batches.filter(batch =>
    Object.values(batch).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
  ));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredBatches.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredBatches.length / recordsPerPage);

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
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Batch(s)</h1>
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch No.#</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Date</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((batch) => (
              <motion.tr
                key={batch._id}
                variants={rowVariants}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{batch.batchNo}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{batch.course}</td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {new Date(batch.startDate).toLocaleDateString()} - {new Date(batch.endDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FiCheck className="mr-1" />
                    {batch.published}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  <div className="flex justify-center gap-2">
                    <motion.button
                      className="text-blue-500 hover:text-blue-700"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => {
                        setEditBatch(batch);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiEdit />
                    </motion.button>
                    <motion.button
                      className="text-red-500 hover:text-red-700"
                      whileHover={{ scale: 1.1 }}
                      onClick={() => confirmDelete(batch._id)}
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
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredBatches.length)} of {filteredBatches.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
          >
            Previous
          </button>
          <span className="px-3 py-1 text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded text-sm ${
              currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"
            }`}
          >
            Next
          </button>
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
                    {editBatch ? "Edit Batch" : "Add Batch"}
                  </Heading>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-4">
                      <TextField className="block">
                        <Label className="block mb-1 font-medium">
                          Batch No *
                        </Label>
                        <Input
                          name="batchNo"
                          defaultValue={editBatch?.batchNo || ""}
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </TextField>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">
                          Subject/Course *
                        </Label>
                        <Input
                          name="course"
                          defaultValue={editBatch?.course || ""}
                          className="w-full p-2 border rounded-lg"
                          required
                        />
                      </TextField>

                      <div className="grid grid-cols-2 gap-4">
                        <TextField className="block">
                          <Label className="block mb-1 font-medium">
                            Starting Date *
                          </Label>
                          <Input
                            type="date"
                            name="startDate"
                            defaultValue={editBatch?.startDate?.split('T')[0] || ""}
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </TextField>

                        <TextField className="block">
                          <Label className="block mb-1 font-medium">
                            Ending Date *
                          </Label>
                          <Input
                            type="date"
                            name="endDate"
                            defaultValue={editBatch?.endDate?.split('T')[0] || ""}
                            className="w-full p-2 border rounded-lg"
                            required
                          />
                        </TextField>
                      </div>

                      <div className="space-y-2">
                        <Label className="block mb-1 font-medium">Published</Label>
                        <div className="flex gap-4">
                          {["Yes", "No"].map(option => (
                            <label key={option} className="flex items-center gap-2">
                              <input
                                type="radio"
                                name="published"
                                value={option}
                                required
                                defaultChecked={editBatch?.published === option}
                                className="w-4 h-4"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <Button
                        onPress={() => {
                          close();
                          setEditBatch(null);
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                      >
                        Save changes
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

export default Batches;