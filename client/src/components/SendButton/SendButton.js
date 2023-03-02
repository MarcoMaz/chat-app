import PropTypes from 'prop-types';
import './SendButton.css';

const SendButton = ({ handleMessage }) => {
  return (
    <button type="button" className="Button" onClick={handleMessage}>
      Send
    </button>
  );
};

SendButton.propTypes = {
  handleMessage: PropTypes.func.isRequired
};

export default SendButton;
