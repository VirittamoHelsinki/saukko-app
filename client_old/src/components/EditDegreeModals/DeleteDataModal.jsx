import React from 'react';
import { Typography, Box } from '@mui/material';
import NotificationModal from '../NotificationModal/NotificationModal';
import Button from '../Button/Button';

const DeleteDataModal = ({
  isDeleteDataModalOpen,
  handleCloseDeleteDataModal,
}) => {
  return (
    <NotificationModal
      type='iconInfo'
      hideIcon={true}
      hideCloseButton={true}
      title={
        <Box>
          <Typography
            sx={{
              marginTop: '10px',
              marginBottom: '10px',
              marginRight: '10px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Olet arkistoinnissa tietoa joka liittyy 2 työnantajaan.
          </Typography>
          <Typography
            sx={{
              paddingTop: '10px',
              marginBottom: '10px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
            }}
          >
            Oletko varma?
          </Typography>
        </Box>
      }
      open={isDeleteDataModalOpen}
      dialogStyles={{
        dialogPaper: {
          borderLeft: 'none',
          padding: '0 1.6rem',
        },
        dialogTitle: {
          testAlign: 'center',
        },
      }}
      body={
        <Box>
          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '20px',
            }}
          >
            <Button
              text='Peruuta'
              variant='contained'
              style={{
                backgroundColor: '#FFFFFF',
                border: '2px solid #1A1A1A',
                marginRight: '20px',
              }}
              onClick={handleCloseDeleteDataModal}
            ></Button>
            <Button
              text='Arkistoi'
              variant='contained'
              style={{
                backgroundColor: '#B01038',
                color: 'white',
                border: 'none',
              }}
              onClick={handleCloseDeleteDataModal}
            ></Button>
          </Box>
        </Box>
      }
      handleClose={handleCloseDeleteDataModal}
    />
  );
};

export default DeleteDataModal;