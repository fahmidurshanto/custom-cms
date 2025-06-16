import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { AnimatePresence, motion } from "framer-motion";

// This fixes the unused motion import warning while keeping the animation functionality

// Custom CSS to hide scrollbar
const hideScrollbarStyle = {
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  WebkitOverflowScrolling: 'touch',
};

// Custom component to handle scrollbar hiding
const HideScrollbar = () => {
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  
  return null;
};
import "react-tabs/style/react-tabs.css";
import {
  ChartBarIcon,
  UserPlusIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  BookOpenIcon,
  UsersIcon,
  AcademicCapIcon,
  UserGroupIcon,
  EnvelopeIcon,
  DocumentChartBarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/24/outline";
import DashBoard from "../Dashboard/DashBoard";
import Admission from "../Admission/Admission";
import Location from "../Location/Location";
import Vendors from "../Vendors/Vendors";
import Courses from "../Courses/Courses";
import Batches from "../Batches/Batches";
import CertificationDispatch from "../CertificationDispatch/CertificationDispatch";
import Employees from "../Employees/Employees";
import Marketing from "../Marketing/Marketing";
import Reports from "../Reports/Reports";

const SideNavigationTab = ({ onToggleCollapse, isCollapsed: propIsCollapsed, isMobile }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [localIsCollapsed, setLocalIsCollapsed] = useState(propIsCollapsed || false);
  
  // Sync with parent component's state
  useEffect(() => {
    setLocalIsCollapsed(propIsCollapsed);
  }, [propIsCollapsed]);

  const handleToggleCollapse = () => {
    const newState = !localIsCollapsed;
    setLocalIsCollapsed(newState);
    if (onToggleCollapse) {
      onToggleCollapse(newState);
    }
  };

  const navItems = [
    { name: 'Dashboard', icon: ChartBarIcon },
    { name: 'Admission', icon: UserPlusIcon },
    { name: 'Location', icon: MapPinIcon },
    { name: 'Vendors', icon: BuildingOfficeIcon },
    { name: 'Courses', icon: BookOpenIcon },
    { name: 'Batches', icon: UsersIcon },
    { name: 'Certification Dispatch', icon: AcademicCapIcon },
    { name: 'Employees', icon: UserGroupIcon },
    { name: 'E-Marketing', icon: EnvelopeIcon },
    { name: 'Reports', icon: DocumentChartBarIcon },
  ];

  return (
    <>
      <HideScrollbar />
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <div className="flex h-screen overflow-hidden">
          {/* Left Side Navigation Bar */}
          <motion.div
            initial={false}
            animate={{
              width: isMobile ? (localIsCollapsed ? '0' : '16rem') : (localIsCollapsed ? '5rem' : '16rem'),
              opacity: isMobile && localIsCollapsed ? 0 : 1,
              x: isMobile && localIsCollapsed ? '-100%' : 0,
              transition: { duration: 0.3, ease: 'easeInOut' }
            }}
            style={hideScrollbarStyle}
            className={`fixed left-0 top-0 h-screen overflow-y-auto bg-gradient-to-b from-indigo-600 to-indigo-800 text-white p-4 rounded-r-xl shadow-xl z-20 hide-scrollbar ${
              isMobile ? 'w-64' : ''
            }`}
        >
          {/* Collapse Toggle Button */}
          {!isMobile && (
            <motion.button
              onClick={handleToggleCollapse}
              className="absolute -right-3 top-8 bg-indigo-500 rounded-full p-1 shadow-lg hover:bg-indigo-600 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label={localIsCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {localIsCollapsed ? 
                <ChevronRightIcon className="w-4 h-4 text-white" /> : 
                <ChevronLeftIcon className="w-4 h-4 text-white" />
              }
            </motion.button>
          )}

          <TabList className="flex flex-col gap-2 mt-8">
            {navItems.map((item, index) => (
              <Tab key={index} className="w-full">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 p-2 rounded-lg cursor-pointer
                    ${tabIndex === index ? 'bg-red-500/20 shadow-md' : 'hover:bg-white/10'}
                    transition-all duration-200
                  `}
                >
                  <item.icon className={`w-5 h-5 ${tabIndex === index ? 'text-red-500' : 'text-white/60'}`} />
                  <AnimatePresence>
                    {(!localIsCollapsed || isMobile) && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className={`whitespace-nowrap overflow-hidden ${
                          tabIndex === index ? 'text-green-400 font-medium' : 'text-white/60'
                        }`}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Tab>
            ))}
          </TabList>
        </motion.div>

          {/* Right Side Content */}
          <div className={`flex-1 p-6 bg-gray-50 min-h-screen overflow-y-auto hide-scrollbar ${
            isMobile ? 'ml-0' : (localIsCollapsed ? 'ml-[5rem]' : 'ml-[16rem]')
          } transition-all duration-300`}>
            {/* Extra div to ensure content doesn't shift when scrollbar appears/disappears */}
            <div className="pr-1">
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Removed redundant heading since DashBoard component has its own */}
              <DashBoard></DashBoard>
            </motion.div>
          </TabPanel>
          {/* Admission */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Admission</h1>
              <Admission></Admission>
            </motion.div>
          </TabPanel>
          {/* Location */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Location Management</h1>
             <Location></Location>
            </motion.div>
          </TabPanel>
          {/* Vendors */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Vendors Content</h1>
             <Vendors></Vendors>
            </motion.div>
          </TabPanel>
          {/* Courses */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Courses Content</h1>
                <Courses></Courses>
            </motion.div>
          </TabPanel>
          {/* Batches */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Batches Content</h1>
                <Batches></Batches>
            </motion.div>
          </TabPanel>
          {/* Certification Dispatch */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Certification Dispatch</h1>
                <CertificationDispatch></CertificationDispatch>
            </motion.div>
          </TabPanel>
          {/* Employees */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Employees Contents</h1>
                <Employees></Employees>
            </motion.div>
          </TabPanel>
          {/* E-Marketing */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">E-Marketing</h1>
                <Marketing></Marketing>
            </motion.div>
          </TabPanel>
          {/* Reports */}
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Reports</h1>
                <Reports></Reports>
            </motion.div>
          </TabPanel>
            </div> {/* Closing div for pr-1 */}
          </div> {/* Closing div for right side content */}
        </div> {/* Closing div for flex container */}
      </Tabs>
    </>
  );
};

export default SideNavigationTab;