import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, isThinking }) => {
  let isThinkingClassName = '';
  let messageIsSenderClassName = '';
  let messageArrowIsSenderClassName = '';

  if (isThinking === '-highlight') {
    isThinkingClassName = 'Message--highlight';
  } else {
    isThinkingClassName = 'Message--thinking';
  }
  if (isSender) {
    messageIsSenderClassName = 'Message--sender';
    messageArrowIsSenderClassName = 'Message__arrow--right';
  } else {
    messageIsSenderClassName = 'Message--receiver';
    messageArrowIsSenderClassName = 'Message__arrow--left';
  }

  return (
    <div className={`Message ${isThinkingClassName} ${messageIsSenderClassName}`}>
      {text}
      <div className={`Message__arrow ${messageArrowIsSenderClassName}`}></div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  isThinking: PropTypes.string
};

export default Message;
