import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
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

const Location = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locationData, setLocationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAddLocation = (e) => {
    e.preventDefault();
    const form = e.target;
    const location = form.location.value;
    const address1 = form.addressLine1.value;
    const address2 = form.addressLine2.value;
    const published = form.published.value;
    const fullLocation = {
      location,
      address1,
      address2,
      published,
    };
    axios
      .post("http://localhost:3000/locations", fullLocation)
      .then((data) => {
        const newLocationInfo = data.data;
        if (newLocationInfo.insertedId) {
          toast.success("Location added successfully");
          form.reset();
          closeModal();
        }
        axios
          .get("http://localhost:3000/locations")
          .then((data) => {
            setLocationData(data.data);
            setCurrentPage(1); // Reset to first page after adding new location
          });
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/locations")
      .then((data) => setLocationData(data.data));
  }, []);

  // Filter locations based on search term
  const filteredLocations = locationData.filter(location => 
    location.location.toLowerCase().includes(search.toLowerCase()) ||
    location.address1.toLowerCase().includes(search.toLowerCase()) ||
    location.address2.toLowerCase().includes(search.toLowerCase()) ||
    location.published.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination calculations using filtered data
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
      <ToastContainer position="top-right" />
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
            <option value={10}>10 records per page</option>
            <option value={20}>20 records per page</option>
            <option value={50}>50 records per page</option>
          </select>
          
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border rounded-lg"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
          
          <Button
            onPress={openModal}
            className="cursor-pointer flex justify-center gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            <FaPlusSquare /> Add New
          </Button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Location</th>
              <th className="p-2 text-left">Address</th>
              <th className="p-2 text-left">Published</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((location, index) => (
              <motion.tr
                key={index}
                className="border-b hover:bg-gray-100"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="p-2">{location.location}</td>
                <td className="p-2">
                  {location.address1}, {location.address2}
                </td>
                <td className="p-2">{location.published}</td>
                <td className="p-2 flex space-x-2">
                  <button className="bg-blue-500 text-white p-2 rounded-lg">
                    <FaEdit />
                  </button>
                  <button className="bg-red-500 text-white p-2 rounded-lg">
                    <FaTrash />
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
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 py-1 rounded ${
                  currentPage === number
                    ? "bg-blue-600 text-white"
                    : "bg-blue-100 hover:bg-blue-200"
                }`}
              >
                {number}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded ${
                currentPage === totalPages
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding new location */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog>
          {({ close }) => (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-white rounded-lg p-6 w-full max-w-md"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <Heading slot="title" className="text-xl font-bold mb-4">
                  Add New Location
                </Heading>
                <form onSubmit={handleAddLocation} className="space-y-4">
                  <TextField className="block">
                    <Label className="block mb-1">Location</Label>
                    <Input
                      required
                      name="location"
                      className="w-full p-2 border rounded"
                      placeholder="Location"
                    />
                  </TextField>
                  <TextField className="block">
                    <Label className="block mb-1">Address Line 1</Label>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="Address Line 1"
                      name="addressLine1"
                    />
                  </TextField>
                  <TextField className="block">
                    <Label className="block mb-1">Address Line 2</Label>
                    <Input
                      required
                      className="w-full p-2 border rounded"
                      placeholder="Address Line 2"
                      name="addressLine2"
                    />
                  </TextField>
                  <TextField className="flex items-center gap-2.5">
                    <div className="flex items-center gap-1.5">
                      <label>
                        <span>Yes</span>
                      </label>
                      <input type="radio" value="Yes" name="published" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label>
                        <span>No</span>
                      </label>
                      <input type="radio" value="No" name="published" />
                    </div>
                  </TextField>
                  <div className="flex justify-end space-x-2">
                    <Button
                      onPress={closeModal}
                      className="px-4 py-2 border rounded-lg cursor-pointer"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:bg-blue-600"
                    >
                      Save
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