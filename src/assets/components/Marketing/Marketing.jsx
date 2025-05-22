import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlusSquare, FaPaperclip } from "react-icons/fa";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Marketing = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailData, setEmailData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editEmail, setEditEmail] = useState(null);
  const [attachment, setAttachment] = useState(null);

  // Modal handling
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setEditEmail(null);
    setAttachment(null);
  };

  // Toast confirmation dialog
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Are you sure you want to delete this email?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={() => {
              handleDeleteConfirmation(id);
              toast.dismiss();
            }}
          >
            Yes
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
      }
    );
  };

  // Delete confirmation handler
  const handleDeleteConfirmation = async (id) => {
    try {
      await axios.delete(`https://custom-cms-backend.vercel.app/e-marketing/${id}`);
      const { data } = await axios.get("https://custom-cms-backend.vercel.app/e-marketing");
      setEmailData(data);
      toast.success("Email deleted successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    
    formData.append("to", form.to.value);
    formData.append("fromMail", form.fromMail.value);
    formData.append("subject", form.subject.value);
    formData.append("body", form.body.value);
    formData.append("proverb", form.proverb.value);
    
    if (attachment) {
      formData.append("attachment", attachment);
    }

    try {
      if (editEmail) {
        await axios.put(`https://custom-cms-backend.vercel.app/e-marketing/${editEmail._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Email updated successfully");
      } else {
        await axios.post("https://custom-cms-backend.vercel.app/e-marketing", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Email added successfully");
      }

      const { data } = await axios.get("https://custom-cms-backend.vercel.app/e-marketing");
      setEmailData(data);
      closeModal();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // File upload handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 12 * 1024 * 1024) {
      toast.error("File size exceeds 12MB limit");
      return;
    }
    setAttachment(file);
  };

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://custom-cms-backend.vercel.app/e-marketing");
        setEmailData(data);
      } catch (error) {
        toast.error("Failed to fetch emails");
      }
    };
    fetchData();
  }, []);

  // Filter and pagination calculations
  const filteredEmails = emailData.filter(email =>
    Object.values(email).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase()))
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEmails.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredEmails.length / recordsPerPage);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
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
          
          <button
            onClick={openModal}
            className="flex gap-2 items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            <FaPlusSquare /> Add New
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              {["From", "Subject", "Date", "Status", "Actions"].map((header, index) => (
                <th key={index} className="p-2 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((email) => (
              <tr key={email._id} className="border-b hover:bg-gray-50">
                <td className="p-2">{email.fromMail}</td>
                <td className="p-2">{email.subject}</td>
                <td className="p-2">{new Date(email.date).toLocaleDateString()}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    email.status === "Pending" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-green-100 text-green-800"
                  }`}>
                    {email.status}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditEmail(email);
                      openModal();
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => confirmDelete(email._id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstRecord + 1} to{" "}
            {Math.min(indexOfLastRecord, filteredEmails.length)} of{" "}
            {filteredEmails.length} entries
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded ${
                currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"
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
                currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-3xl shadow-xl">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">
                {editEmail ? "Edit Email" : "Compose New Email"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block font-medium">To</label>
                    <input
                      type="datetime-local"
                      name="to"
                      className="w-full p-2 border rounded-lg"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">From Mail</label>
                    <input
                      name="fromMail"
                      defaultValue="BSS-mo-repypjaima.com-"
                      className="w-full p-2 border rounded-lg bg-gray-100"
                      readOnly
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="font-medium">Subject:</label>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-3 py-1 border rounded-lg bg-blue-100 text-blue-600"
                      >
                        16 selected
                      </button>
                      <button
                        type="button"
                        className="px-3 py-1 border rounded-lg"
                      >
                        OR — None selected
                      </button>
                    </div>
                  </div>
                  <input
                    name="subject"
                    placeholder="HELLO WE HAVE A OFFER"
                    className="w-full p-2 border rounded-lg"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-medium">Body</label>
                  <textarea
                    name="body"
                    className="w-full p-2 border rounded-lg h-32"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 font-medium">
                      <FaPaperclip />
                      Attach File/Photo
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-500">12MB Maximum</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block font-medium">Proverb</label>
                    <input
                      name="proverb"
                      className="w-full p-2 border rounded-lg"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="submit"
                      className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Send now
                    </button>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-red-600 font-bold hover:bg-red-50 rounded-lg"
                  >
                    X Discard
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketing;