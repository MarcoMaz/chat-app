import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, isThinking }) => {
  return (
    <div
      className={`Message ${isThinking ? 'Message--thinking' : ''} ${
        isSender ? 'Message--sender' : 'Message--receiver'
      }`}>
      {text}
      <div
        className={`Message__arrow ${
          isSender ? 'Message__arrow--left' : 'Message__arrow--right'
        }`}></div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  isThinking: PropTypes.string
};

export default Message;
