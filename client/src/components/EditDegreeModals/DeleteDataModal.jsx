import { Typography, Box } from '@mui/material';
import NotificationModal from '../NotificationModal/NotificationModal';
import Button from '../Button/Button';

const DeleteDataModal = ({
  isDeleteDataModalOpen,
  handleCloseDeleteDataModal,
}) => {
  return (
    <NotificationModal
      type='alert'
      hideButton={true}
      title='Olet arkistoinnissa tietoa.'
      open={isDeleteDataModalOpen}
      dialogStyles={{
        dialogPaper: {
          padding: '0 1rem',
          '@media (min-width:768px)': {
            maxWidth: '38%',
          },
          '@media (min-width:1024px)': {
            maxWidth: '30%',
          },
          '@media (min-width:1440px)': {
            maxWidth: '20%',
          },
        },
      }}
      body={
        <Box>
          <Typography style={{fontSize: '14px'}}>Oletko arkistoinnissa tietoa, joka liittyy 2 työnantajaan. Oletko varma?</Typography>
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
                color: '#0000BF',
                border: '2px solid #0000BF',
                marginRight: '20px',
              }}
              onClick={handleCloseDeleteDataModal}
            ></Button>
            <Button
              text='Kyllä, arkistoi'
              variant='contained'
              style={{
                backgroundColor: '#0000BF',
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