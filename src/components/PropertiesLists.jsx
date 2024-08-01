import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Typography, Modal, Box, Button, ListItemAvatar, Avatar } from '@mui/material';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import PropertyDetails from './propertiesDetails';

const PropertiesList = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProperties = async () => {
      const querySnapshot = await getDocs(collection(db, 'rentals'));
      const propertiesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProperties(propertiesData);
    };

    fetchProperties();
  }, []);

  const handleOpen = (property) => {
    setSelectedProperty(property);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProperty(null);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'rentals', id));
    setProperties(properties.filter(property => property.id !== id));
    handleClose();
  };

  const handleModify = async (updatedProperty) => {
    await updateDoc(doc(db, 'rentals', updatedProperty.id), updatedProperty);
    setProperties(properties.map(property => property.id === updatedProperty.id ? updatedProperty : property));
    handleClose();
  };

  return (
    <div>
      <Typography variant="h4">Properties</Typography>
      <List>
        {properties.map((property) => (
          <ListItem button key={property.id} onClick={() => handleOpen(property)}>
            <ListItemAvatar>
              <Avatar src={property.images ? property.images[0] : ''} alt={property.area} />
            </ListItemAvatar>
            <ListItemText primary={property.area} secondary={property.availability} />
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
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedProperty && (
            <PropertyDetails 
              property={selectedProperty} 
              onDelete={() => handleDelete(selectedProperty.id)}
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

export default PropertiesList;
