import React, { useState } from 'react';
import { TextField, Button, Typography, Container } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Import the Firebase Auth

const AddUser = ({ handleClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleAddUser = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('User added successfully');
      handleClose(); // Close the modal on success
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container>
      <Typography variant="h6">Add New User</Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <Typography color="error">{error}</Typography>}
      <Button variant="contained" color="primary" onClick={handleAddUser}>
        Add User
      </Button>
    </Container>
  );
};

export default AddUser;
