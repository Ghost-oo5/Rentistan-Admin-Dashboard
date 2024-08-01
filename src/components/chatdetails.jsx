// src/components/ChatDetails.jsx
import React from 'react';
import { Typography, Box } from '@mui/material';

const ChatDetails = ({ chat }) => {
  return (
    <Box>
      <Typography variant="h6">Chat Details</Typography>
      <Typography><strong>Title:</strong> {chat.title}</Typography>
      <Typography><strong>Description:</strong> {chat.description}</Typography>
      {/* Add more chat details as needed */}
    </Box>
  );
};

export default ChatDetails;
