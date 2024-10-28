import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Main11 from "../ui/Main11";
import Content from "../ui/Content";
import { useState } from "react";
import Cards from "../components/Cards/Cards";
import Calender from "../components/Calender"

const AdminDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [selectedCardContent, setSelectedCardContent] = useState(null);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen);
  };

  const handleCardClick = (content) => {
    setSelectedCardContent(content);
  };

  return (
    <div className={`${darkMode && "dark"} font-quicksand bg-slate-200 h-screen flex overflow-hidden`}>
      <Sidebar isSideBarOpen={isSideBarOpen} className="z-50 max-w-[200px]"  />
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar} />

        <div className="flex-1 ml-[240px] overflow-auto">
          {selectedCardContent && (
            <div className="p-4 bg-white">
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
    </div>
  );
};

export default AdminDashboard;
