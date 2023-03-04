import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ chatAppName }) => {
  return <header className="Header">{chatAppName}</header>;
};

Header.propTypes = {
  chatAppName: PropTypes.string
};

export default Header;
