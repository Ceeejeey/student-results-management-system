import React from 'react';
import { Link } from 'react-router-dom';

const LinkitemStudent = ({ href, icon: Icon, text, state }) => {
  return (
    <li>
      <Link to={{ pathname: href, state }} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
        <Icon className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};

export default LinkitemStudent;