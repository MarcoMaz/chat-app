/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './Main.css';

import Message from '../Message/Message';

const Main = ({ socket, messages, setMessages }) => {
  const lastMessageRef = useRef(null);

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

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <main className="Main">
      {messages.map(({ text, className, userName, additionalClassName }, index) => {
        const isLastMessage = index === messages.length - 1;

        return (
          <Message
            className={className}
            key={index}
            text={text}
            additionalClassName={additionalClassName}
            isSender={userName === sessionStorage.getItem('userName')}
          />
        );
      })}
      <div ref={lastMessageRef} />
    </main>
  );
};

Main.propTypes = {
  socket: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  setMessages: PropTypes.func.isRequired
};

export default Main;
