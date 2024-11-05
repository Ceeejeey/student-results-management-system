import React from 'react';
import LinkitemStudent from './LinkItemStudent';
import { links1 } from '../constant-student/index1';// Ensure the import path is correct

const StudentSideBar = ({ isSideBarOpen, studentData, activeSemester }) => {
  return (
    <aside className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className='h-full px-3 pb-4 overflow-y-auto'>
        <ul className='space-y-2 font-medium'>
          {
            links1.map((link, index) => (
              <LinkitemStudent 
                key={index} 
                {...link} 
                state={{ studentData, activeSemester }} // Passing state
              />
            ))
          }
        </ul>
      </div>
    </aside>
  );
};

export default StudentSideBar;