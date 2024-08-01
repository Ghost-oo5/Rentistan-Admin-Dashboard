// src/pages/UsersPage.jsx
import React, { useState } from 'react';
import { Typography, Button, Modal, Box } from '@mui/material';
import UsersList from '../components/userslists';
import AddUser from '../components/AddUser';

const UsersPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New User
      </Button>
      <UsersList />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <AddUser onClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
};

export default UsersPage;
