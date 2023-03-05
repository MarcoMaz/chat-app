import PropTypes from 'prop-types';

import './Countdown.css';

const Countdown = ({ countdownTime }) => {
  return <div className="Countdown">{countdownTime}</div>;
};

Countdown.propTypes = {
  countdownTime: PropTypes.number.isRequired
};

export default Countdown;
