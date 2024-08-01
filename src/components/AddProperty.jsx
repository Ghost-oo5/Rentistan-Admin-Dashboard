// src/components/AddPropertyForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Grid, Box } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const AddPropertyForm = () => {
  const [property, setProperty] = useState({
    title: '',
    area: '',
    description: '',
    postedByName: '',
    rooms: '',
    availability: '',
    price: '',
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'rentals'), property);
      setProperty({
        title: '',
        area: '',
        description: '',
        postedByName: '',
        rooms: '',
        availability: '',
        price: '',
        images: [],
      });
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField 
            label="Title" 
            name="title" 
            value={property.title} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Area" 
            name="area" 
            value={property.area} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Description" 
            name="description" 
            value={property.description} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Posted By" 
            name="postedByName" 
            value={property.postedByName} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Rooms" 
            name="rooms" 
            value={property.rooms} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Availability" 
            name="availability" 
            value={property.availability} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
          <TextField 
            label="Rent" 
            name="price" 
            value={property.price} 
            onChange={handleChange} 
            fullWidth 
            margin="normal" 
          />
        </Grid>
      </Grid>
      <Button type="submit" variant="contained" color="primary">
        Add Property
      </Button>
    </Box>
  );
};

export default AddPropertyForm;
