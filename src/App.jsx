import { Outlet, useLocation } from "react-router-dom";
import SideNavigationTab from "./assets/components/SideNavigationTab/SideNavigatonTab";
import { useState, useEffect } from "react";
import ModernFormExample from "./components/forms/examples/ModernFormExample";

// Add global styles to hide scrollbar but keep functionality
const hideScrollbarStyles = `
  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

// Add styles to the document head
const styleElement = document.createElement('style');
styleElement.textContent = hideScrollbarStyles;
document.head.appendChild(styleElement);

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      
      // Collapse sidebar by default on mobile
      if (isMobileView) {
        setIsSidebarCollapsed(true);
      } else {
        setIsSidebarCollapsed(false);
      }
    };

    // Set initial state
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Hide scrollbar but keep functionality
  useEffect(() => {
    document.body.style.overflowX = 'hidden';
    return () => {
      document.body.style.overflowX = 'auto';
    };
  }, []);

  const location = useLocation();
  const isFormPage = location.pathname === '/form-example';

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-hidden">
      <SideNavigationTab 
        onToggleCollapse={setIsSidebarCollapsed} 
        isCollapsed={isSidebarCollapsed}
        isMobile={isMobile}
      />
      
      {/* Overlay for mobile when sidebar is open */}
      {!isSidebarCollapsed && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => setIsSidebarCollapsed(true)}
        />
      )}
      
      <main 
        className={`flex-1 transition-all duration-300 ease-in-out w-full ${
          isSidebarCollapsed 
            ? isMobile ? 'ml-0' : 'md:ml-20' 
            : isMobile ? 'ml-0' : 'md:ml-64'
        } p-4 md:p-6 overflow-y-auto h-screen hide-scrollbar`}
      >
        <div className="w-full max-w-[1800px] mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6">
            {isFormPage ? (
              <ModernFormExample />
            ) : (
              <Outlet />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
