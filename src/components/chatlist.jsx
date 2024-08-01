// src/components/ChatList.jsx
import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const ChatList = ({ onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const querySnapshot = await getDocs(collection(db, 'chats'));
      const chatsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChats(chatsData);
    };

    fetchChats();
  }, []);

  return (
    <div>
      <Typography variant="h4">Chats</Typography>
      <List>
        {chats.map((chat) => (
          <ListItem button key={chat.id} onClick={() => onSelectChat(chat)}>
           <ListItemText primary="See all messages" />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ChatList;
