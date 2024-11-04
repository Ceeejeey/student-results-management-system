import { FaMoon, FaSun } from 'react-icons/fa';
import { HiOutlineMenuAlt2 } from 'react-icons/hi';
import { MdSpaceDashboard } from 'react-icons/md';

const StudentHeader = ({ darkMode, toggleDarkMode,toggleSideBar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-{#dd5f5f} dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-items-start rtl:justify-end">
            
            <a href="#" className="flex ms-2 md:me-24">
              <MdSpaceDashboard className="h-8 text-xl me-3 text-violet-500" />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white ">
                Hello Student,
              </span>
            </a>
          </div>
          <button className="p-2 rounded-full dark:bg-slate-50 dark:text-slate-700" onClick={toggleDarkMode}>
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default StudentHeader;
