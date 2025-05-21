import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiCheck } from "react-icons/fi";
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

const CertificationDispatch = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editCertification, setEditCertification] = useState(null);

  // Fetch certifications
  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/certifications");
        setCertifications(data);
      } catch (error) {
        toast.error("Failed to fetch certifications");
      }
    };
    fetchCertifications();
  }, []);

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      certificateId: form.certificateId.value,
      recipient: form.recipient.value,
      course: form.course.value,
      issueDate: form.issueDate.value,
      status: form.status.value
    };

    try {
      if (editCertification) {
        await axios.put(`http://localhost:3000/certifications/${editCertification._id}`, formData);
        toast.success("Certification updated successfully");
      } else {
        await axios.post("http://localhost:3000/certifications", formData);
        toast.success("Certification added successfully");
      }

      const { data } = await axios.get("http://localhost:3000/certifications");
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
                await axios.delete(`http://localhost:3000/certifications/${id}`);
                const { data } = await axios.get("http://localhost:3000/certifications");
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Certificate ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Recipient</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Issue Date</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((certification, index) => (
              <motion.tr
                key={certification._id}
                variants={rowVariants}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-4 text-sm font-medium text-gray-900">{certification.certificateId}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{certification.recipient}</td>
                <td className="px-4 py-4 text-sm text-gray-500">{certification.course}</td>
                <td className="px-4 py-4 text-sm text-gray-500 text-center">
                  {new Date(certification.issueDate).toLocaleDateString()}
                </td>
                <td className="px-4 py-4 text-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    certification.status === "Issued" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {certification.status}
                  </span>
                </td>
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

      {/* Pagination and Add/Edit Modal */}
      {/* Similar to previous components, add pagination and modal code here */}

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
                      <Label className="block mb-1 font-medium">Certificate ID *</Label>
                      <Input
                        name="certificateId"
                        defaultValue={editCertification?.certificateId || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Recipient *</Label>
                      <Input
                        name="recipient"
                        defaultValue={editCertification?.recipient || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Course *</Label>
                      <Input
                        name="course"
                        defaultValue={editCertification?.course || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <TextField className="block">
                      <Label className="block mb-1 font-medium">Issue Date *</Label>
                      <Input
                        type="date"
                        name="issueDate"
                        defaultValue={editCertification?.issueDate?.split('T')[0] || ""}
                        className="w-full p-2 border rounded-lg"
                        required
                      />
                    </TextField>

                    <div className="space-y-2">
                      <Label className="block mb-1 font-medium">Status *</Label>
                      <div className="flex gap-4">
                        {["Issued", "Pending"].map(option => (
                          <label key={option} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="status"
                              value={option}
                              required
                              defaultChecked={editCertification?.status === option}
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