import React, { useState } from 'react';
import { Typography, Box, Button, TextField } from '@mui/material';

const UserDetails = ({ user, onDelete, onModify }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onModify(updatedUser);  // Call the onModify function with the updated user
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h6">User Details</Typography>
      <Typography variant="body1"><strong>Profile Picture:</strong></Typography>
      <img src={user.photoURL} alt="Profile" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />

      {isEditing ? (
        <div>
           <TextField 
            label="Name" 
            name="name" 
            value={updatedUser.name} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Email" 
            name="email" 
            value={updatedUser.email} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Phone No" 
            name="contactNumber" 
            value={updatedUser.contactNumber} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Address" 
            name="address" 
            value={updatedUser.address} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Profile Type" 
            name="profileType" 
            value={updatedUser.profileType} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="WhatsApp Number" 
            name="whatsappNumber" 
            value={updatedUser.whatsappNumber} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      ) : (
        <div>
          <Typography><strong>Name:</strong> {user.name}</Typography>
          <Typography><strong>Email:</strong> {user.email}</Typography>
          <Typography><strong>Phone No:</strong> {user.contactNumber}</Typography>
          <Typography><strong>Address:</strong> {user.address}</Typography>
          <Typography><strong>Profile Type:</strong> {user.profileType}</Typography>
          <Typography><strong>WhatsApp Number:</strong> {user.whatsappNumber}</Typography>
        </div>
      )}

      <Button variant="contained" color="secondary" onClick={() => onDelete(user.id)}>
        Delete
      </Button>
      <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Modify'}
      </Button>
    </Box>
  );
};

export default UserDetails;
