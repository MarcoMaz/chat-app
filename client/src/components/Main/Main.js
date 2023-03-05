/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Main.css';

import Message from '../Message/Message';

const Main = ({ socket, messages, setMessages }) => {
  useEffect(() => {
    socket.on('messageResponse', (data) => setMessages([...messages, data]));
    socket.on('removeLastMessageResponse', () => {
      const updatedMessages = messages.slice(0, -1);
      setMessages(updatedMessages);
    });
    socket.on('smileResponse', (data) => {
      setMessages([...messages, data]);
    });
    socket.on('winkResponse', (data) => {
      setMessages([...messages, data]);
    });
    socket.on('fadeLastMessageResponse', () => {
      setMessages((prevMessages) => {
        const newMessages = prevMessages.map((message, index) => {
          if (index === prevMessages.length - 1) {
            return { ...message, className: 'Message--fade-last' };
          }
          return message;
        });
        return newMessages;
      });
    });
  }, [socket, messages, setMessages]);

  return (
    <main className="Main">
      {messages.map(({ text, className, userName, additionalClassName }, index) => (
        <Message
          className={className}
          key={index}
          text={text}
          additionalClassName={additionalClassName}
          isSender={userName === sessionStorage.getItem('userName')}
        />
      ))}
    </main>
  );
};

Main.propTypes = {
  socket: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired
};

export default Main;
