import PropTypes from 'prop-types';
import './SendButton.css';

const SendButton = ({ handleMessage, isDisabled }) => {
  const sendButtonClassName = `${isDisabled !== '' ? 'Button -disabled' : 'Button'}`;

  return (
    <button type="button" className={sendButtonClassName} onClick={handleMessage}>
      Send
    </button>
  );
};

SendButton.propTypes = {
  handleMessage: PropTypes.func.isRequired,
  isDisabled: PropTypes.string.isRequired
};

export default SendButton;
