import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './Message.css';

const Message = ({ text, className, isSender, additionalClassName }) => {
  const [isNewMessage, setIsNewMessage] = useState(false);
  const messageRef = useRef(null);

  useEffect(() => {
    setIsNewMessage(true);
  }, []);

  useEffect(() => {
    if (isNewMessage && messageRef.current) {
      // Wait for the initial render to finish before animating
      setTimeout(() => {
        messageRef.current.classList.add('Message--slide-in');
        setIsNewMessage(false);

        // Add slide-up class to all previous message containers
        let prevMessage = messageRef.current.previousSibling;
        while (prevMessage) {
          prevMessage.classList.add('Message--slide-up');
          prevMessage = prevMessage.previousSibling;
        }
      }, 0);
    }
  }, [isNewMessage]);

  const classNames = [
    'Message',
    additionalClassName === '-highlight'
      ? 'Message--highlight'
      : additionalClassName === '-thinking'
      ? 'Message--thinking'
      : '',
    isSender ? 'Message--sender' : 'Message--receiver',
    className ? 'Message--fade-last' : ''
  ];

  const messageArrowIsSenderClassName = isSender ? 'Message__arrow--right' : 'Message__arrow--left';

  return (
    <div className={classNames.join(' ')} ref={messageRef}>
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
