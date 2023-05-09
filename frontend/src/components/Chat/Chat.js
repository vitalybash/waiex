import React, { useEffect, useState } from 'react';
import { w3cwebsocket as W3CwebSocket } from "websocket";

const Chat = () => {
  const [socket, setSocket] = useState(null);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Get the username from local storage or prompt the user to enter it
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      const input = prompt("Enter your username:");
      if (input) {
        setUsername(input);
        localStorage.setItem("username", input);
      }
    }

    // Connect to the WebSocket server with the username as a query parameter
    const newSocket = new WebSocket(`ws://http://127.0.0.1:8000/ws/socket-server/`);
    setSocket(newSocket);

    newSocket.onopen = () => console.log("WebSocket connected");
    newSocket.onclose = () => console.log("WebSocket disconnected");

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      newSocket.close();
    };
  }, [username]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, data]);
      };
    }
  }, [socket]);

  return (
    <div>

    </div>
  );
};

export default Chat;