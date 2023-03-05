import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, className, isSender, additionalClassName }) => {
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
    <div className={classNames.join(' ')}>
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
