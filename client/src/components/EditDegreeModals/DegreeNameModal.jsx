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

const DegreeNameModal = ({
  degreeDetails,
  setDegreeDetails,
  handleCloseDegreeNameModal,
  saveDegreeName,
  isDegreeNameModalOpen,
}) => {
  return (
    <NotificationModal
      type='info'
      dialogStyles={{
        dialogTitle: {
          marginLeft: '4px',
          marginRight: '5px',
        },
      }}
      title={
        <Typography
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            marginRight: '25px',
            marginLeft: '15px',
          }}
        >
          Tutkinnon nimen muokkaus
        </Typography>
      }
      // sx={{ width: '100%' }}
      hideIcon={true}
      body={
        <>
          <IconButton
            aria-label='close'
            onClick={handleCloseDegreeNameModal}
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
          <DialogContent
          // sx={{ minWidth: '25vw' }}
          >
            <Box>
              <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                Tutkinnon nimi
              </Typography>
              <TextField
                value={degreeDetails.name.fi}
                id='outlined-multiline-static'
                multiline={degreeDetails.name.fi.length > 5}
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    name: {
                      ...prevState.name,
                      fi: event.target.value,
                    },
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      borderColor: 'black',
                      borderWidth: '2px',
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
                onClick={saveDegreeName}
                handleClose={handleCloseDegreeNameModal}
              ></Button>
            </Box>
          </DialogContent>
        </>
      }
      open={isDegreeNameModalOpen}
      handleClose={handleCloseDegreeNameModal}
    />
  );
};

export default DegreeNameModal;
