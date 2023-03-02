import PropTypes from 'prop-types';
import './InputText.css';

const InputText = ({ value, onChange }) => {
  return (
    <input
      className="InputText"
      type="text"
      placeholder="Send a message"
      value={value}
      onChange={onChange}
    />
  );
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default InputText;
