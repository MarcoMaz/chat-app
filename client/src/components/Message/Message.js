import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender }) => {
  return (
    <div className={`Message ${isSender ? 'Message--sender' : 'Message--receiver'}`}>{text}</div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired
};

export default Message;
