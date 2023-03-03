import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, className }) => {
  return (
    <div
      className={`Message ${className ? '-highlight' : ''} ${
        isSender ? 'Message--sender' : 'Message--receiver'
      }`}>
      {text}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  className: PropTypes.string.isRequired
};

export default Message;
