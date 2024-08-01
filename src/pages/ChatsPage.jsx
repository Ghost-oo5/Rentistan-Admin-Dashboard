// src/pages/ChatsPage.jsx
import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ChatList from '../components/chatlist';
import ChatWindow from '../components/chatwindow';


const ChatsPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <ChatList onSelectChat={setSelectedChat} />
      </Grid>
      <Grid item xs={8}>
        {selectedChat ? (
          <ChatWindow chatId={selectedChat.id} />
        ) : (
          <div>Select a chat to view messages</div>
        )}
      </Grid>
    </Grid>
  );
};

export default ChatsPage;
