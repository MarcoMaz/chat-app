import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, className, isSender, additionalClassName }) => {
  let isThinkingClassName = '';
  let messageIsSenderClassName = '';
  let messageArrowIsSenderClassName = '';
  let fadeClass = '';

  if (additionalClassName === '-highlight') {
    isThinkingClassName = 'Message--highlight';
  } else if (additionalClassName === '-thinking') {
    isThinkingClassName = 'Message--thinking';
  } else {
    isThinkingClassName = '';
  }
  if (isSender) {
    messageIsSenderClassName = 'Message--sender';
    messageArrowIsSenderClassName = 'Message__arrow--right';
  } else {
    messageIsSenderClassName = 'Message--receiver';
    messageArrowIsSenderClassName = 'Message__arrow--left';
  }

  if (className) {
    fadeClass = 'Message--fade-last';
  }

  return (
    <div className={`Message ${isThinkingClassName} ${messageIsSenderClassName} ${fadeClass}`}>
      {text}
      <div className={`Message__arrow ${messageArrowIsSenderClassName}`}></div>
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  isSender: PropTypes.bool.isRequired,
  additionalClassName: PropTypes.string
};

export default Message;
