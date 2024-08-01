// src/components/ChatWindow.jsx
import React, { useEffect, useState } from 'react';
import { Typography, Box, List, ListItem, ListItemText, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { doc, collection, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatWindow = ({ chatId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const messagesRef = collection(db, 'chats', chatId, 'messages');
      const querySnapshot = await getDocs(messagesRef);
      const messagesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(messagesData);
    };

    if (chatId) {
      fetchMessages();
    }
  }, [chatId]);

  const handleDeleteMessage = async (messageId) => {
    const messageRef = doc(db, 'chats', chatId, 'messages', messageId);
    await deleteDoc(messageRef);
    setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
  };

  return (
    <Box>
      <Typography variant="h6">Chat Messages</Typography>
      <List>
        {messages.map((message) => (
          <ListItem key={message.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteMessage(message.id)}>
              <DeleteIcon />
            </IconButton>
          }>
            <ListItemText
              primary={message.text}
              secondary={`From: ${message.senderName} at ${message.createdAt?.toDate().toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatWindow;
