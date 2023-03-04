import PropTypes from 'prop-types';

import './Typing.css';

const Typing = ({ userName }) => {
  return (
    <div className="Footer__typing">
      <em>{userName} is typing...</em>
    </div>
  );
};

Typing.propTypes = {
  userName: PropTypes.string.isRequired
};

export default Typing;
