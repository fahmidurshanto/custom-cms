import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash2, FiPlus, FiChevronLeft, FiChevronRight, FiUpload } from 'react-icons/fi';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [employeesRes, vendorsRes] = await Promise.all([
          axios.get('https://custom-cms-backend.vercel.app/employees'),
          axios.get('https://custom-cms-backend.vercel.app/vendors')
        ]);
        setEmployees(employeesRes.data);
        console.log(vendorsRes.data)
        setVendors(vendorsRes.data);
      } catch (error) {
        toast.error('Failed to load data');
      }
    };
    fetchData();
  }, []);

  const getVendorName = (vendorId) => {
    const vendor = vendors.find(v => v._id === vendorId);
    return vendor ? vendor.name : 'Unknown Vendor';
  };

  const filteredEmployees = employees.filter(employee =>
    Object.values(employee).some(value =>
      value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
  ));

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredEmployees.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredEmployees.length / recordsPerPage);

  const confirmDelete = (id) => {
    toast.info(
      <div className="p-4">
        <p className="mb-3 font-medium">Delete this employee?</p>
        <div className="flex gap-2 justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={async () => {
              try {
                await axios.delete(`https://custom-cms-backend.vercel.app/employees/${id}`);
                setEmployees(employees.filter(emp => emp.id !== id));
                toast.dismiss();
                toast.success("Employee deleted successfully");
              } catch (error) {
                toast.error("Failed to delete employee");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      if (editEmployee) {
        await axios.put(`https://custom-cms-backend.vercel.app/employees/${editEmployee.id}`, formData);
        toast.success('Employee updated');
      } else {
        await axios.post('https://custom-cms-backend.vercel.app/employees', formData);
        toast.success('Employee added');
      }
      
      const { data } = await axios.get('https://custom-cms-backend.vercel.app/employees');
      setEmployees(data);
      setIsModalOpen(false);
      setEditEmployee(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('file-name').textContent = file.name;
    }
  };

  const handleSignatureInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      document.getElementById('signature-name').textContent = file.name;
    }
  };
  console.log(vendors)

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm min-h-screen">
      <ToastContainer />
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Employee Management</h1>
        <h2 className="text-lg mt-2 text-gray-600">Employee List</h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          className="w-full md:w-auto border p-2 rounded-lg text-sm"
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
        
        <div className="w-full md:max-w-md flex gap-2">
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full p-2 border rounded-lg text-sm"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-blue-600 transition-colors"
            onClick={() => setIsModalOpen(true)}
          >
            <FiPlus className="text-base" /> Add
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Photo', 'Name', 'Surname', 'Vendor', 'Email', 'Contact', 'Status', 'Actions'].map((header) => (
                <th key={header} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentRecords.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-4 py-4">
                  {employee.photo ? (
                    <img src={employee.photo} alt="Employee" className="h-10 w-10 rounded-full object-cover" />
                  ) : (
                    <div className="h-10 w-10 bg-gray-200 rounded-full" />
                  )}
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{employee.fullName}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{employee.surname}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{getVendorName(employee.vendor)}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{employee.email}</td>
                <td className="px-4 py-4 text-sm text-gray-600">{employee.contact}</td>
                <td className="px-4 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 p-1.5 rounded hover:bg-blue-50"
                      onClick={() => {
                        setEditEmployee(employee);
                        setIsModalOpen(true);
                      }}
                    >
                      <FiEdit size={18} />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 p-1.5 rounded hover:bg-red-50"
                      onClick={() => confirmDelete(employee.id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <span className="text-sm text-gray-600">
          Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredEmployees.length)} of {filteredEmployees.length} entries
        </span>
        <div className="flex gap-1.5">
          <button
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            <FiChevronLeft />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1.5 rounded-md ${
                currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 overflow-y-auto z-50">
          <div className="bg-white rounded-xl w-full max-w-4xl mx-auto shadow-2xl">
            <div className="p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">
                {editEmployee ? "Edit Employee" : "Add Employee"}
              </h2>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Photo *</label>
                    <label className="w-full flex flex-col items-center px-4 py-8 bg-white text-blue-600 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 cursor-pointer transition-colors">
                      <FiUpload className="text-2xl mb-2" />
                      <span className="text-sm text-gray-500" id="file-name">
                        {editEmployee?.photo ? editEmployee.photo : 'Choose Files'}
                      </span>
                      <input
                        type="file"
                        name="photo"
                        className="hidden"
                        onChange={handleFileInput}
                        accept="image/*"
                        required={!editEmployee}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      name="email"
                      defaultValue={editEmployee?.email || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">M:No. *</label>
                    <input
                      type="text"
                      name="mNumber"
                      defaultValue={editEmployee?.mNumber || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Address Line 1 *</label>
                    <input
                      type="text"
                      name="address1"
                      defaultValue={editEmployee?.address1 || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Position</label>
                    <select
                      name="position"
                      defaultValue={editEmployee?.position || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-</option>
                      <option value="Manager">Manager</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Staff">Staff</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Status</label>
                    <select
                      name="status"
                      defaultValue={editEmployee?.status || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">-</option>
                      <option value="Live">Live</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Full Name *</label>
                    <input
                      type="text"
                      name="fullName"
                      defaultValue={editEmployee?.fullName || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Date of Birth *</label>
                      <input
                        type="date"
                        name="dob"
                        defaultValue={editEmployee?.dob || ""}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Licence No. *</label>
                      <input
                        type="text"
                        name="licenseNo"
                        defaultValue={editEmployee?.licenseNo || ""}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Address Line 2</label>
                    <input
                      type="text"
                      name="address2"
                      defaultValue={editEmployee?.address2 || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Joining Date *</label>
                      <input
                        type="date"
                        name="joiningDate"
                        defaultValue={editEmployee?.joiningDate || ""}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block mb-2 font-medium text-gray-700">Leaving Date</label>
                      <input
                        type="date"
                        name="leavingDate"
                        defaultValue={editEmployee?.leavingDate || ""}
                        className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Signature *</label>
                    <label className="w-full flex flex-col items-center px-4 py-8 bg-white text-blue-600 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 cursor-pointer transition-colors">
                      <FiUpload className="text-2xl mb-2" />
                      <span className="text-sm text-gray-500" id="signature-name">
                        {editEmployee?.signature ? editEmployee.signature : 'Choose Files'}
                      </span>
                      <input
                        type="file"
                        name="signature"
                        className="hidden"
                        onChange={handleSignatureInput}
                        accept="image/*"
                        required={!editEmployee}
                      />
                    </label>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      name="contact"
                      defaultValue={editEmployee?.contact || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Gender *</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Male"
                          defaultChecked={editEmployee?.gender === 'Male'}
                          className="w-4 h-4 text-blue-500"
                          required
                        />
                        Male
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="gender"
                          value="Female"
                          defaultChecked={editEmployee?.gender === 'Female'}
                          className="w-4 h-4 text-blue-500"
                          required
                        />
                        Female
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Employee Vendor (Employer)</label>
                    <select
                      name="vendor"
                      defaultValue={editEmployee?.vendor || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Vendor</option>
                      {vendors && vendors.map(vendor => (
                        <option key={vendor._id} value={vendor._id}>
                          {vendor.name || vendor.vendorName}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                {/* Full-width Fields */}
                <div className="md:col-span-2 space-y-4">
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">Note (Minimum 200 characters) *</label>
                    <textarea
                      name="note"
                      defaultValue={editEmployee?.note || ""}
                      className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                      minLength="200"
                      required
                    ></textarea>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-end border-t pt-6">
                    <button
                      type="button"
                      className="px-6 py-2.5 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => {
                        setIsModalOpen(false);
                        setEditEmployee(null);
                      }}
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      {editEmployee ? "Save Changes" : "Add Employee"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;