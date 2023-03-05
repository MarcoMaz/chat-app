import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender, additionalClassName }) => {
  let isThinkingClassName = '';
  let messageIsSenderClassName = '';
  let messageArrowIsSenderClassName = '';

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
  additionalClassName: PropTypes.string
};

export default Message;
