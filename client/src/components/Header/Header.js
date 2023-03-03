import { useState, useEffect } from 'react';

import './Header.css';

const Header = () => {
  const [chatApp, setChatApp] = useState('');

  useEffect(() => {
    const storedChatApp = sessionStorage.getItem('chatAppName');
    if (storedChatApp) {
      setChatApp(storedChatApp);
    }
  }, [chatApp]);

  return <header className="Header">{chatApp}</header>;
};

export default Header;
