import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash, Plus } from "lucide-react";
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

const Vendor = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vendors, setVendors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [editVendor, setEditVendor] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [existingLogo, setExistingLogo] = useState("");

  // Fetch vendors
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const { data } = await axios.get("http://localhost:3000/vendors");
        setVendors(data);
      } catch (error) {
        toast.error("Failed to fetch vendors", {
          position: "top-right",
          autoClose: 5000,
        });
      }
    };
    fetchVendors();
  }, []);

  // Handle file input change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setLogoPreview("");
      setLogoFile(null);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const approvedBy = Array.from(form.elements.approvedBy)
      .filter(checkbox => checkbox.checked)
      .map(checkbox => checkbox.value);

    const formData = new FormData();
    
    if (logoFile) {
      formData.append("logo", logoFile);
    } else if (editVendor?.logo) {
      formData.append("logo", editVendor.logo);
    }
    
    formData.append("name", form.name.value);
    formData.append("fax", form.fax.value);
    formData.append("published", form.published.value);
    approvedBy.forEach(value => formData.append("approvedBy", value));
    formData.append("accountInfo", form.accountInfo.value);
    formData.append("webAddress", form.webAddress.value);
    formData.append("address1", form.address1.value);
    formData.append("address2", form.address2.value);
    formData.append("regInfo", form.regInfo.value);
    formData.append("phone", form.phone.value);
    formData.append("email", form.email.value);
    formData.append("invoicePrefix", form.invoicePrefix.value);

    try {
      if (editVendor) {
        await axios.put(`http://localhost:3000/vendors/${editVendor._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Vendor updated successfully", { position: "top-right", autoClose: 3000 });
      } else {
        await axios.post("http://localhost:3000/vendors", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        toast.success("Vendor added successfully", { position: "top-right", autoClose: 3000 });
      }

      const { data } = await axios.get("http://localhost:3000/vendors");
      setVendors(data);
      setIsModalOpen(false);
      setEditVendor(null);
      setLogoFile(null);
      setLogoPreview("");
      setExistingLogo("");
      if (!editVendor) setCurrentPage(1);
    } catch (error) {
      toast.error(error.message, { position: "top-right", autoClose: 5000 });
    }
  };

  // Delete confirmation
  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Delete this vendor?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={async () => {
              try {
                await axios.delete(`http://localhost:3000/vendors/${id}`);
                const { data } = await axios.get("http://localhost:3000/vendors");
                setVendors(data);
                toast.dismiss();
                toast.success("Vendor deleted", { position: "top-right", autoClose: 3000 });
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
  const filteredVendors = vendors.filter(vendor =>
    Object.values(vendor).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
  ));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredVendors.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredVendors.length / recordsPerPage);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-white shadow-md rounded-lg"
    >
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Vendor Management</h2>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
        <select
          className="w-full md:w-auto border p-2 rounded"
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
          placeholder="Search vendors..."
          className="w-full md:w-64 border p-2 rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
        >
          <Plus size={16} />
          Add Vendor
        </button>
      </div>

      <div className="overflow-x-auto">
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
            {currentRecords.map((vendor) => (
              <motion.tr
                key={vendor._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b"
              >
                <td className="p-2">
                  <img 
                    src={vendor.logo || "/placeholder-logo.png"} 
                    alt={vendor.name} 
                    className="w-10 h-10 object-contain" 
                  />
                </td>
                <td className="p-2">{vendor.name}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    vendor.published === "Yes" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {vendor.published}
                  </span>
                </td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditVendor(vendor);
                      setExistingLogo(vendor.logo || "");
                      setIsModalOpen(true);
                    }}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => confirmDelete(vendor._id)}
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                  >
                    <Trash size={16} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
        <div className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredVendors.length)} of {filteredVendors.length} entries
        </div>
        <div className="flex gap-2 flex-wrap justify-center">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200" : "bg-blue-500 text-white"}`}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i+1}
              onClick={() => setCurrentPage(i+1)}
              className={`px-3 py-1 rounded ${currentPage === i+1 ? "bg-blue-600 text-white" : "bg-blue-100"}`}
            >
              {i+1}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded ${currentPage === totalPages ? "bg-gray-200" : "bg-blue-500 text-white"}`}
          >
            Next
          </button>
        </div>
      </div>

      {/* Vendor Modal */}
      <Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
        <Dialog>
          {({ close }) => (
            <motion.div
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="bg-white rounded-xl w-full max-w-2xl mx-4 md:mx-0"
                style={{
                  maxHeight: "90vh",
                  minHeight: "50vh",
                }}
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
              >
                <div className="p-6 overflow-y-auto" style={{ maxHeight: "80vh" }}>
                  <Heading className="text-xl font-bold mb-4">
                    {editVendor ? "Edit Vendor" : "Add Vendor"}
                  </Heading>
                  
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4">
                      <div className="block">
                        <Label className="block mb-1 font-medium">Logo {!editVendor && "*"}</Label>
                        
                        {/* Image Preview */}
                        <div className="mb-4 border-2 border-dashed rounded-lg p-2 flex items-center justify-center h-48 bg-gray-50">
                          <img
                            src={logoPreview || existingLogo || "/placeholder-logo.png"}
                            alt="Logo preview"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        {/* File Input */}
                        <label className="block w-full px-4 py-2 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors text-center">
                          <input
                            type="file"
                            accept="image/*"
                            name="logo"
                            onChange={handleFileChange}
                            required={!editVendor}
                            className="hidden"
                          />
                          <span className="text-blue-600 font-medium">
                            {logoPreview || existingLogo ? "Change Logo" : "Upload Logo"}
                          </span>
                          <p className="text-sm text-gray-500 mt-1">
                            (Recommended size: 500x500px, Max size: 2MB)
                          </p>
                        </label>
                      </div>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Vendor Name *</Label>
                        <Input
                          name="name"
                          placeholder="Vendor Name"
                          defaultValue={editVendor?.name || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </TextField>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Fax</Label>
                        <Input
                          type="tel"
                          placeholder="Fax Number"
                          name="fax"
                          defaultValue={editVendor?.fax || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
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
                                defaultChecked={editVendor?.published === option}
                                className="w-4 h-4 text-blue-600"
                              />
                              {option}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="block mb-1 font-medium">Approved By</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {["City&Guilds", "URILP", "EDI", "edexcel", "nocn"].map(org => (
                            <label key={org} className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                name="approvedBy"
                                value={org}
                                defaultChecked={editVendor?.approvedBy?.includes(org)}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300"
                              />
                              {org}
                            </label>
                          ))}
                        </div>
                      </div>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Account Info</Label>
                        <textarea
                          name="accountInfo"
                          defaultValue={editVendor?.accountInfo || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24"
                          placeholder="Bank Name, AC Name: XYZ services Ltd, Account No: 21425xxx, Sort code: 40-xx-xx"
                        />
                      </TextField>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Web Address</Label>
                        <Input
                          name="webAddress"
                          placeholder="https://www.example.com"
                          type="url"
                          defaultValue={editVendor?.webAddress || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </TextField>

                      <div className="space-y-2">
                        <Label className="block mb-1 font-medium">Address</Label>
                        <Input
                          name="address1"
                          placeholder="Address Line 1"
                          defaultValue={editVendor?.address1 || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 mb-2"
                        />
                        <Input
                          name="address2"
                          placeholder="Address Line 2"
                          defaultValue={editVendor?.address2 || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Registration Info</Label>
                        <Input
                          name="regInfo"
                          placeholder="Registration Number"
                          defaultValue={editVendor?.regInfo || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </TextField>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Phone</Label>
                        <Input
                          name="phone"
                          placeholder="Phone Number"
                          type="tel"
                          defaultValue={editVendor?.phone || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </TextField>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Email</Label>
                        <Input
                          name="email"
                          placeholder="example@email.com"
                          type="email"
                          defaultValue={editVendor?.email || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </TextField>

                      <TextField className="block">
                        <Label className="block mb-1 font-medium">Invoice Prefix</Label>
                        <Input
                          name="invoicePrefix"
                          placeholder="Invoice Prefix"
                          defaultValue={editVendor?.invoicePrefix || ""}
                          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </TextField>
                    </div>

                    {/* Form Actions */}
                    <div className="col-span-2 flex justify-end gap-3 mt-6">
                      <Button
                        onPress={() => {
                          close();
                          setEditVendor(null);
                          setLogoFile(null);
                          setLogoPreview("");
                          setExistingLogo("");
                        }}
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </Button>
                      <Button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                      >
                        {editVendor ? "Save Changes" : "Add Vendor"}
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </Dialog>
      </Modal>
    </motion.div>
  );
};

export default Vendor;