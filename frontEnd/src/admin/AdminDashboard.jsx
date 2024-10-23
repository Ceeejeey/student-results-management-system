import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import { useState } from "react";
import Cards from "../components/Cards/Cards";

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null); // Track selected card content

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleCardClick = (content) => {
    setSelectedCardContent(content); // Set selected card content
  };

  return (
    <div className={` ${darkMode && "dark"} font-quicksand bg-slate-200 h-screen flex`}>
      <Sidebar isSideBarOpen={isSideBarOpen} />
      
      <div className="flex-1 relative">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar} />

        {/* Display selected card content at top-left */}
        {selectedCardContent && (
          <div className="absolute top-0 left-0 p-4 bg-white z-50">
            {selectedCardContent}
          </div>
        )}

        <Main11>
          <Content>
            <Cards onCardClick={handleCardClick} />
          </Content>
        </Main11>
      </div>
    </div>
  );
};

export default AdminDashboard;
