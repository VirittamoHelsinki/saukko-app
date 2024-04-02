import React from 'react';
import {
  Typography,
  IconButton,
  Box,
  DialogContent,
  TextField,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import NotificationModal from '../NotificationModal/NotificationModal';
import Button from '../Button/Button';

const DegreeInformationModal = ({
  handleCloseDegreeInformationModal,
  isDegreeInformationModalOpen,
  degreeDetails,
  setDegreeDetails,
  saveDegreeInformation,
}) => {
  
  return (
    <NotificationModal
      type='info'
      hideIcon={true}
      dialogStyles={{
        dialogTitle: {
          marginLeft: '4px',
          marginRight: '5px',
        },
      }}
      title={
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: 'bold',
            marginRight: '25px',
            marginLeft: '15px',
          }}
        >
          Tutkinnon tietojen muokkaus
        </Typography>
      }
      body={
        <>
          <IconButton
            aria-label='close'
            onClick={handleCloseDegreeInformationModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: 'black',
              marginLeft: '2rem',
            }}
          >
            <CancelOutlinedIcon />
          </IconButton>
          <DialogContent>
            <Box>
              <Typography
                sx={{
                  fontWeight: 'bold',
                  fontSize: '16px',
                  marginBottom: '15px',
                }}
              >
                {degreeDetails.name.fi}
              </Typography>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Määräyksen diaarinumero
              </Typography>
              <TextField
                value={degreeDetails.diaryNumber || ''}
                id='outlined-multiline-static'
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    diaryNumber: event.target.value,
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Määräyksen päätöspäivämäärä
              </Typography>
              <TextField
                value={degreeDetails.regulationDate || ''}
                id='outlined-multiline-static'
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    regulationDate: event.target.value,
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Voimaantulo
              </Typography>
              <TextField
                value={degreeDetails.validFrom || ''}
                id='outlined-multiline-static'
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    validFrom: event.target.value,
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Voimassaolon päättyminen
              </Typography>
              <TextField
                value={degreeDetails.expiry || ''}
                id='outlined-multiline-static'
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    expiry: event.target.value,
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Siirtymäajan päättymisaika
              </Typography>
              <TextField
                value={degreeDetails.transitionEnds || ''}
                id='outlined-multiline-static'
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    transitionEnds: event.target.value,
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Button
                text='Tallenna'
                variant='contained'
                style={{
                  marginLeft: '25%',
                  marginTop: '30px',
                  width: '50%',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  border: 'none',
                }}
                // onClick={saveDegreeInformation}
                handleClose={handleCloseDegreeInformationModal}
              ></Button>
            </Box>
          </DialogContent>
        </>
      }
      open={isDegreeInformationModalOpen}
    />
  );
};

export default DegreeInformationModal;
