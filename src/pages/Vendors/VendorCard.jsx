import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaPhone, FaEnvelope, FaGlobe, FaFileInvoice, FaCheckCircle, FaRegClock } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';

const VendorCard = ({ vendor, index = 0 }) => {
  const { 
    name, 
    email, 
    phone, 
    fax,
    published,
    webAddress,
    invoicePrefix,
    registrationInfo,
    logo,
    addresses = [],
    approvedBy = []
  } = vendor;

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: index * 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      variants={container}
      initial="hidden"
      animate="show"
      whileHover={{ scale: 1.01 }}
    >
      {/* Header with vendor name and status */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-6 text-white">
        <motion.div variants={item} className="flex justify-between items-start">
          
          <div className="flex items-center space-x-3">
            <FaBuilding className="w-6 h-6" />
            <h2 className="text-xl font-bold truncate max-w-xs">{name}</h2>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${published === 'Yes' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
            {published === 'Yes' ? 'Published' : 'Draft'}
          </span>
        </motion.div>
      </div>

      {/* Main content */}
      <div className="p-6">
        <motion.div variants={container} className="space-y-4">
        <img src={logo} alt="Vendor Logo" className="w-1/2 h-1/2 rounded-md object-contain" />

          {/* Contact Info */}
          {(email || phone || fax) && (
            <motion.div variants={item} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Contact</h3>
              <div className="space-y-1.5">
                {email && (
                  <p className="flex items-center text-gray-700">
                    <FaEnvelope className="w-4 h-4 mr-2 text-blue-500" />
                    <a href={`mailto:${email}`} className="hover:text-blue-600 hover:underline">{email}</a>
                  </p>
                )}
                {phone && (
                  <p className="flex items-center text-gray-700">
                    <FaPhone className="w-4 h-4 mr-2 text-green-500" />
                    <a href={`tel:${phone}`} className="hover:text-green-600">{phone}</a>
                  </p>
                )}
                {fax && (
                  <p className="flex items-center text-gray-500 text-sm">
                    <span className="w-4 h-4 mr-2">Fax:</span>
                    {fax}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Addresses */}
          {addresses?.length > 0 && (
            <motion.div variants={item} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Addresses</h3>
              <div className="space-y-3">
                {addresses.map((addr, idx) => (
                  <div key={idx} className="flex">
                    <HiLocationMarker className="w-5 h-5 mr-2 mt-0.5 text-red-500 flex-shrink-0" />
                    <div>
                      <p className="font-medium">{addr.address1}</p>
                      {addr.address2 && <p>{addr.address2}</p>}
                      <p className="text-sm text-gray-500">
                        {[addr.city, addr.state, addr.postalCode, addr.country].filter(Boolean).join(', ')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Additional Info */}
          <motion.div variants={item} className="grid grid-cols-2 gap-4 pt-2">
            {webAddress && (
              <div className="flex items-center">
                <FaGlobe className="w-4 h-4 mr-2 text-purple-500" />
                <a 
                  href={webAddress.startsWith('http') ? webAddress : `https://${webAddress}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {webAddress.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            
            {invoicePrefix && (
              <div className="flex items-center">
                <FaFileInvoice className="w-4 h-4 mr-2 text-amber-500" />
                <span className="text-sm text-gray-700">
                  Invoice: <span className="font-medium">{invoicePrefix}-XXX</span>
                </span>
              </div>
            )}
          </motion.div>

          {/* Approved By */}
          {approvedBy?.length > 0 && (
            <motion.div variants={item} className="pt-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Approved By</h3>
              <div className="flex flex-wrap gap-2">
                {approvedBy.map((approver, idx) => (
                  <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    <FaCheckCircle className="w-3 h-3 mr-1" />
                    {approver}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer with registration info */}
      {registrationInfo && (
        <motion.div 
          variants={item}
          className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex items-center text-sm text-gray-500"
        >
          <FaRegClock className="w-4 h-4 mr-2" />
          <span>Registered on {new Date(registrationInfo).toLocaleDateString()}</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VendorCard;
