import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Main.css';

import Message from '../Message/Message';

const Main = ({ socket }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  return (
    <main className="Main">
      {messages.map(({ text, userName, className }, index) => (
        <Message
          key={index}
          text={text}
          className={className}
          isSender={userName === sessionStorage.getItem('userName')}
        />
      ))}
    </main>
  );
};

Main.propTypes = {
  socket: PropTypes.object.isRequired
};

export default Main;
