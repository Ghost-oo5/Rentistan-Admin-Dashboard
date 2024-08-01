import React, { useState } from 'react';
import { Typography, Box, Grid, Button, TextField } from '@mui/material';

const PropertyDetails = ({ property, onDelete, onModify }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProperty, setUpdatedProperty] = useState({ ...property });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProperty(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSave = () => {
    onModify(updatedProperty);
    setIsEditing(false);
  };

  return (
    <Box>
      <Box mt={2}>
        <Typography variant="h6">Images</Typography>
      </Box>
      <Grid container spacing={2}>
        {property.images && property.images.map((image, index) => (
          <Grid item xs={6} md={4} key={index}>
            <img src={image} alt={`Property Image ${index + 1}`} style={{ width: '100%' }} />
          </Grid>
        ))}
      </Grid>
      
      <Box 
        sx={{
          mt: 2,
          maxHeight: '400px',  // Adjust height as needed
          overflowY: 'auto',   // Enable vertical scrolling
          padding: 2
        }}
      >
        {isEditing ? (
          <div>
            <TextField 
              label="Title" 
              name="title" 
              value={updatedProperty.title} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Area" 
              name="area" 
              value={updatedProperty.area} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Description" 
              name="description" 
              value={updatedProperty.description} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Posted By" 
              name="postedByName" 
              value={updatedProperty.postedByName} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Rooms" 
              name="rooms" 
              value={updatedProperty.rooms} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Availability" 
              name="availability" 
              value={updatedProperty.availability} 
              onChange={handleChange} 
              fullWidth 
              margin="normal" 
            />
            <TextField 
              label="Rent" 
              name="price" 
              value={updatedProperty.price} 
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
            <Typography variant="h5">{property.title}</Typography>
            <Typography variant="subtitle1"><strong>Area: </strong>{property.area}</Typography>
            <Typography variant="subtitle1"><strong>Description: </strong>{property.description}</Typography>
            <Typography variant="subtitle1"><strong>PostedBy: </strong>{property.postedByName}</Typography>
            <Typography variant="subtitle1"><strong>Rooms: </strong>{property.rooms}</Typography>
            <Typography variant="subtitle1">Availability: {property.availability}</Typography>
            <Typography variant="subtitle1">Rent: {property.price}</Typography>
          </div>
        )}
      </Box>

      <Button variant="contained" color="secondary" onClick={() => onDelete(property.id)}>
        Delete
      </Button>
      <Button variant="contained" color="primary" onClick={() => setIsEditing(!isEditing)}>
        {isEditing ? 'Cancel' : 'Modify'}
      </Button>
    </Box>
  );
};

export default PropertyDetails;
