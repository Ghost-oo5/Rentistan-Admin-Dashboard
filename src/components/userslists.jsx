import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Modal, Box, Button, ListItemAvatar, Avatar } from '@mui/material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import UserDetails from './usersdetails';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const usersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setUsers(users.filter(user => user.id !== id));
    handleClose();
  };

  const handleModify = async (updatedUser) => {
    await updateDoc(doc(db, 'users', updatedUser.id), updatedUser);
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    handleClose();
  };

  return (
    <div>
      <Typography variant="h4">Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem button key={user.id} onClick={() => handleOpen(user)}>
            <ListItemAvatar>
              <Avatar src={user.photoURL} alt={user.name} />
            </ListItemAvatar>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>

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
          {selectedUser && (
            <UserDetails 
              user={selectedUser} 
              onDelete={() => handleDelete(selectedUser.id)}
              onModify={handleModify}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleClose}>
            Close
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default UsersList;
