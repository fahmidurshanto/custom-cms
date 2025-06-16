import React from 'react';
import { motion } from 'framer-motion';
import { FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaIdCard, FaVenusMars, FaCalendarAlt, FaBriefcase, FaUserClock, FaSignOutAlt, FaStickyNote } from 'react-icons/fa';

const EmployeeCard = ({ employee, index = 0 }) => {
  const {
    fullName,
    email,
    contact,
    position,
    status,
    gender,
    dob,
    joiningDate,
    leavingDate,
    address1,
    address2,
    licenseNo,
    note,
    photo
  } = employee;

  // Animation variants
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.25, 0.1, 0.25, 1]
      }
    },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  // Format date to readable format
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
      variants={item}
      initial="hidden"
      animate="show"
      whileHover="hover"
    >
      {/* Header with photo and basic info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center text-blue-600">
            {photo ? (
              <img 
                src={photo} 
                alt={fullName} 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <FaUserTie className="w-8 h-8" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-bold truncate">{fullName}</h2>
            <p className="text-blue-100 text-sm">{position}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status === 'Live' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {status}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
          <div className="space-y-1.5">
            {email && (
              <p className="flex items-center text-gray-700">
                <FaEnvelope className="w-4 h-4 mr-2 text-blue-500" />
                <a href={`mailto:${email}`} className="hover:text-blue-600 hover:underline">{email}</a>
              </p>
            )}
            {contact && (
              <p className="flex items-center text-gray-700">
                <FaPhone className="w-4 h-4 mr-2 text-green-500" />
                <a href={`tel:${contact}`} className="hover:text-green-600">{contact}</a>
              </p>
            )}
          </div>
        </div>

        {/* Personal Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="flex items-center text-sm text-gray-500">
              <FaVenusMars className="w-4 h-4 mr-2" />
              <span>{gender || 'N/A'}</span>
            </p>
            <p className="flex items-center text-sm text-gray-500">
              <FaCalendarAlt className="w-4 h-4 mr-2" />
              <span>DOB: {formatDate(dob)}</span>
            </p>
          </div>
          <div className="space-y-1">
            <p className="flex items-center text-sm text-gray-500">
              <FaUserClock className="w-4 h-4 mr-2" />
              <span>Joined: {formatDate(joiningDate)}</span>
            </p>
            {leavingDate && (
              <p className="flex items-center text-sm text-gray-500">
                <FaSignOutAlt className="w-4 h-4 mr-2" />
                <span>Left: {formatDate(leavingDate)}</span>
              </p>
            )}
          </div>
        </div>

        {/* Address */}
        {(address1 || address2) && (
          <div className="space-y-1">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Address</h3>
            <p className="flex items-start text-gray-700">
              <FaMapMarkerAlt className="w-4 h-4 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
              <span>
                {address1}
                {address2 && <>, {address2}</>}
              </span>
            </p>
          </div>
        )}

        {/* License Number */}
        {licenseNo && (
          <div className="flex items-center text-sm text-gray-500">
            <FaIdCard className="w-4 h-4 mr-2 text-amber-500" />
            <span>License: {licenseNo}</span>
          </div>
        )}

        {/* Notes */}
        {note && (
          <div className="pt-2 border-t border-gray-100">
            <h3 className="flex items-center text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">
              <FaStickyNote className="w-4 h-4 mr-2" />
              Notes
            </h3>
            <p className="text-sm text-gray-600 whitespace-pre-line">
              {note.length > 100 ? `${note.substring(0, 100)}...` : note}
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default EmployeeCard;
