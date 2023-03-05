import { useEffect } from 'react';
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
  }, [socket, messages]);

  return (
    <main className="Main">
      {messages.map(({ text, userName, isThinking }, index) => (
        <Message
          key={index}
          text={text}
          isThinking={isThinking}
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
