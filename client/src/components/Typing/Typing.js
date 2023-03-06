import PropTypes from 'prop-types';

import './Typing.css';

const Typing = ({ userName, chatAppName }) => {
  return (
    <div className="Footer__typing">
      <em>{chatAppName ? chatAppName : userName} is typing...</em>
    </div>
  );
};

Typing.propTypes = {
  chatAppName: PropTypes.string,
  userName: PropTypes.string.isRequired
};

export default Typing;
