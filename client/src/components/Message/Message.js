import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, isThinking }) => {
  return (
    <div
      className={`Message ${isThinking ? 'Message--thinking' : ''} ${
        isSender ? 'Message--sender' : 'Message--receiver'
      }`}>
      {text}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  isThinking: PropTypes.string.isRequired
};

export default Message;
