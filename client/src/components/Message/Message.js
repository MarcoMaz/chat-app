import PropTypes from 'prop-types';

import './Message.css';

const Message = ({ text }) => {
  return <div className="Message">{text}</div>;
};

Message.propTypes = {
  text: PropTypes.string.isRequired
};

export default Message;

/*
  <div className="Message Message--sender">I am Message</div>
  <div className="Message Message--receiver">I am Message</div>
*/
