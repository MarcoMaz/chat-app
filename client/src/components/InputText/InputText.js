import PropTypes from 'prop-types';
import './InputText.css';

const InputText = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      className="InputText"
      type="text"
      placeholder="Send a message"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
};

InputText.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired
};

export default InputText;
