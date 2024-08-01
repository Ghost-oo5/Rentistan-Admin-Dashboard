import React, { useState } from 'react';
import PropertiesList from '../components/PropertiesLists'; // Adjusted to match your file name
import AddPropertyForm from '../components/AddProperty'; // Import AddPropertyForm
import { Button, Modal, Box } from '@mui/material';

const PropertiesPage = () => {
  const [openAddForm, setOpenAddForm] = useState(false);

  const handleOpenAddForm = () => setOpenAddForm(true);
  const handleCloseAddForm = () => setOpenAddForm(false);

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpenAddForm}>
        Add New Property
      </Button>

      <Modal open={openAddForm} onClose={handleCloseAddForm}>
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
          <AddPropertyForm />
          <Button variant="contained" color="secondary" onClick={handleCloseAddForm}>
            Close
          </Button>
        </Box>
      </Modal>

      <PropertiesList />
    </div>
  );
};

export default PropertiesPage;
