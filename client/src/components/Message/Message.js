import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, isThinking }) => {
  console.log('CHECK', isThinking);

  let highlightClassName = '';

  if (isThinking === '-highlight') {
    if (isSender) {
      highlightClassName = 'Message--highlight Message--sender';
    } else {
      highlightClassName = 'Message--highlight Message--receiver';
    }
  }

  return (
    <div
      className={`Message ${highlightClassName}${
        isThinking === '-thinking' ? 'Message--thinking' : ''
      } ${isSender ? 'Message--sender' : 'Message--receiver'}`}>
      {text}
      <div
        className={`Message__arrow ${
          isSender ? 'Message__arrow--right' : 'Message__arrow--left'
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
