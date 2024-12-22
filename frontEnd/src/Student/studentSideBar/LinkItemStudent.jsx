import React from 'react';
import { Link } from 'react-router-dom';

const LinkItemStudent = ({ href, icon: Icon, text, state }) => {
  return (
    <li>
      <Link
        to={{ pathname: href, state }} // Pass the required state via `to`
        className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Icon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        <span className="ml-3">{text}</span>
      </Link>
    </li>
  );
};

export default LinkItemStudent;
