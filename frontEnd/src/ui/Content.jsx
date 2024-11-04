
import PropTypes from 'prop-types';

const Content = ({ children }) => {
  return (
    <div className="flex flex-col flex-1 gap-5 overflow-auto">
      {children}
    </div>
  );
};

Content.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Content;
