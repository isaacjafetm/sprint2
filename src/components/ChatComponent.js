import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import '../styles/chat.css';

const socket = io('http://localhost:5000'); // Ajusta la URL según el servidor

function ChatComponent({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const newMessage = { user: currentUser.name, text: message };
      socket.emit('send_message', newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === currentUser.name ? 'own' : ''}`}>
            <strong>{msg.user}: </strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Escribe un mensaje"
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Enviar</button>
    </div>
  );
}

export default ChatComponent;
