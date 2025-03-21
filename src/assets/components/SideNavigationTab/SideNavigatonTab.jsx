import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { motion } from "framer-motion";
import "react-tabs/style/react-tabs.css"; // Default styles for react-tabs
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

const SideNavigationTab = () => {
  const [tabIndex, setTabIndex] = useState(0); // State to track the active tab index

  return (
    <div className="flex h-screen">
      {/* Left Side Navigation Bar */}
      <div className="w-48 bg-gray-100 p-4">
      <h2>Navigation</h2>
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="flex flex-col gap-2">
            <Tab>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
              >
                Dashboard
              </motion.div>
            </Tab>
            <Tab>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
              >
                Admission
              </motion.div>
            </Tab>
            <Tab>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
              >
                Location
              </motion.div>
            </Tab>
            <Tab>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
              >
                Vendors
              </motion.div>
            </Tab>
            <Tab>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
              >
                Courses
              </motion.div>
            </Tab>
                <Tab>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors"
                >
                    Batches
                </motion.div>
                </Tab>
                <Tab>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors w-full"
                >
                    Certification Dispatch
                </motion.div>
                </Tab>
                <Tab>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors w-full"
                >
                    Employees
                </motion.div>
                </Tab>
                <Tab>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors w-full"
                >
                    E-Marketing
                </motion.div>
                </Tab>
                <Tab>
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer rounded-lg hover:text-amber-600 transition-colors w-full"
                >
                    Reports
                </motion.div>
                </Tab>
          </TabList>
        </Tabs>
      </div>

      {/* Right Side Content */}
      <div className="flex-1 p-6">
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Dashboard Content</h1>
              <DashBoard></DashBoard>
            </motion.div>
          </TabPanel>
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
          <TabPanel>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-2xl font-bold mb-4">Location Content</h1>
             <Location></Location>
            </motion.div>
          </TabPanel>
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
        </Tabs>
      </div>
    </div>
  );
};

export default SideNavigationTab;