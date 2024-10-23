import React from 'react';
import PropTypes from 'prop-types';

const Content = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col gap-5 overflow-auto">
      {children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
