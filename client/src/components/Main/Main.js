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
      {/* {messages.map(({ text }, index) => (
        <Message key={index} text={text} />
      ))} */}
      {messages.map((message, index) => {
        const isSender = message.userName === sessionStorage.getItem('userName');
        return isSender ? (
          <Message key={index} text={message.text} isSender={isSender} />
        ) : (
          <div key={message.id}>
            <strong>Them</strong>
            <p>{message.text}</p>
          </div>
        );
      })}
    </main>
  );
};

Main.propTypes = {
  socket: PropTypes.object.isRequired
};

export default Main;
