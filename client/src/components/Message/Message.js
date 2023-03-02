import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text, isSender }) => {
  return (
    <div className="Message">
      <strong>isSender: {isSender}</strong>
      {text}
    </div>
  );
};

Message.propTypes = {
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired
};

export default Message;

/*
  <div className="Message Message--sender">I am Message</div>
  <div className="Message Message--receiver">I am Message</div>
*/
