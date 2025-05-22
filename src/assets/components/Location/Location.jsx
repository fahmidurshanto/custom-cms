import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlusSquare } from "react-icons/fa";
import {
  Button,
  Dialog,
  DialogTrigger,
  Heading,
  Input,
  Label,
  Modal,
  TextField,
} from "react-aria-components";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Location = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editLocation, setEditLocation] = useState(null);

  // Modal handling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditLocation(null);
  };

  // Toast confirmation dialog
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Are you sure you want to delete this location?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            onClick={() => {
              handleDeleteConfirmation(id);
              toast.dismiss();
            }}
          >
            Yes
          </button>
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
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

  // Delete confirmation handler
  const handleDeleteConfirmation = async (id) => {
    try {
      await axios.delete(`https://custom-cms-backend.vercel.app/locations/${id}`);
      const { data } = await axios.get("https://custom-cms-backend.vercel.app/locations");
      setLocationData(data);
      toast.success("Location deleted successfully", {
        position: "top-right",
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      location: form.location.value,
      address1: form.addressLine1.value,
      address2: form.addressLine2.value,
      published: form.published.value,
    };

    try {
      if (editLocation) {
        await axios.put(`https://custom-cms-backend.vercel.app/locations/${editLocation._id}`, formData);
        toast.success("Location updated successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        await axios.post("https://custom-cms-backend.vercel.app/locations", formData);
        toast.success("Location added successfully", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      const { data } = await axios.get("https://custom-cms-backend.vercel.app/locations");
      setLocationData(data);
      closeModal();
      if (!editLocation) setCurrentPage(1);
    } catch (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://custom-cms-backend.vercel.app/locations");
        setLocationData(data);
      } catch (error) {
        toast.error("Failed to fetch locations", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
    fetchData();
  }, []);

  // Filter and pagination calculations
  const filteredLocations = locationData.filter(location =>
    Object.values(location).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
  ));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredLocations.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredLocations.length / recordsPerPage);

  return (
    <motion.div
      className="p-6 bg-gray-100 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer />
      <div className="bg-white p-4 rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <select
            className="p-2 border rounded-lg"
            value={recordsPerPage}
            onChange={(e) => {
              setRecordsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
          >
            {[10, 20, 50].map(option => (
              <option key={option} value={option}>{option} records per page</option>
            ))}
          </select>
          
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg w-64"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
          
          <Button
            onPress={openModal}
            className="cursor-pointer flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <FaPlusSquare /> Add New
          </Button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {["Location", "Address", "Published", "Actions"].map((header, index) => (
                <th key={index} className="p-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((location, index) => (
              <motion.tr
                key={location._id}
                className="border-b hover:bg-gray-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-2">{location.location}</td>
                <td className="p-2">{`${location.address1}, ${location.address2}`}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    location.published === "Yes" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {location.published}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditLocation(location);
                      openModal();
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(location._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, filteredLocations.length)} of{" "}
            {filteredLocations.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-blue-600 text-white" : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages ? "bg-gray-200 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
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
                className="bg-white rounded-xl p-6 w-full max-w-md"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <Heading slot="title" className="text-xl font-bold mb-4">
                  {editLocation ? "Edit Location" : "Add New Location"}
                </Heading>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <TextField className="block">
                    <Label className="block mb-1 font-medium">Location Name</Label>
                    <Input
                      name="location"
                      required
                      defaultValue={editLocation?.location || ""}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </TextField>

                  <TextField className="block">
                    <Label className="block mb-1 font-medium">Address Line 1</Label>
                    <Input
                      name="addressLine1"
                      required
                      defaultValue={editLocation?.address1 || ""}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </TextField>

                  <TextField className="block">
                    <Label className="block mb-1 font-medium">Address Line 2</Label>
                    <Input
                      name="addressLine2"
                      required
                      defaultValue={editLocation?.address2 || ""}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </TextField>

                  <div className="space-y-2">
                    <Label className="block mb-1 font-medium">Published Status</Label>
                    <div className="flex gap-4">
                      {["Yes", "No"].map((option) => (
                        <label key={option} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name="published"
                            value={option}
                            required
                            defaultChecked={editLocation?.published === option}
                            className="w-4 h-4 text-blue-600"
                          />
                          <span>{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <Button
                      onPress={closeModal}
                      className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                    >
                      {editLocation ? "Save Changes" : "Add Location"}
                    </Button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </Dialog>
      </Modal>
    </motion.div>
  );
};

export default Location;