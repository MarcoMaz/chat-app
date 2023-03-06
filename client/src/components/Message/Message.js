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
      setTimeout(() => {
        messageRef.current.classList.add('Message--slide-in');
        setIsNewMessage(false);
      }, 0);
    }
  }, [isNewMessage]);

  const messageClassNames = [
    'Message',
    additionalClassName === '-highlight'
      ? 'Message--highlight'
      : additionalClassName === '-thinking'
      ? 'Message--thinking'
      : '',
    isSender ? 'Message--sender' : 'Message--receiver',
    className ? 'Message--fade-last' : ''
  ];

  return (
    <div className={messageClassNames.join(' ')} ref={messageRef}>
      {text}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  className: PropTypes.string,
  additionalClassName: PropTypes.string
};

export default Message;
