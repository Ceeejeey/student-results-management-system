import React from "react";
import { Link } from "react-router-dom";
import { links1 } from "../constant-student/index1"; // Ensure the import path is correct


const StudentSideBar = ({ isSideBarOpen, index_no, activeSemester, gpa }) => {

  console.log("gpa " + gpa)
  console.log("activeSemester " + activeSemester)
  console.log("studentData in sidebar " + index_no)
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 transition-transform ${isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <div className="h-full px-3 pb-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          {links1.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                state={{ index_no, activeSemester, gpa }}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <link.icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <span className="ml-3">{link.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default StudentSideBar;
