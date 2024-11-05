import { useState } from "react";
import StudentSideBar from "./studentSideBar/StudentSideBar";
import StudentHeader from "./studentHeader/StudentHeader";
import StudentDashBord from "./StudentDashBord";



const StudentDash = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);


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
      <StudentSideBar isSideBarOpen={isSideBarOpen} className="z-50 max-w-[200px]"/>
      
      <div className="flex flex-col flex-1 overflow-hidden">
        <StudentHeader toggleDarkMode={toggleDarkMode} darkMode={darkMode} toggleSideBar={toggleSideBar}/>

        <div className=" fixed overflow-auto w-[100%]">
          

         
            
            
               <StudentDashBord onCardClick={handleCardClick} className="pl-12"/>
           

          
            
              
              
        </div>

      </div>
    </div>
  );
};

export default StudentDash;
