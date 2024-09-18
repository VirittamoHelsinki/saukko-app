import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Button } from '@mui/material';

const WarningDialog = ({ title, bodyText, buttonText, showWarning, handleWarningClose, handleProceed }) => {

  return (<Dialog
    open={showWarning}
    onClose={handleWarningClose}
    aria-labelledby="warning-dialog-title"
    aria-describedby="warning-dialog-description"
    sx={{
      '& .MuiDialog-paper': {
        position: 'relative',
        background: '#FFF4B4', // Gradient background for the dialog
        paddingLeft: '8px', // Space for the accent line
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '8px',
          height: '100%',
          backgroundColor: '#DCA500', // Accent color
          zIndex: 1, // Ensure it is behind the content but in front of the background
        },
      }
    }}
  >
    <DialogTitle id="warning-dialog-title" sx={{
      backgroundColor: '#FFF4B4',
      color: 'black',
      fontWeight: 'bold',
      display: 'flex',
      alignItems: 'center',
      zIndex: 2, // Ensure title is on top
    }}>{title}</DialogTitle>
    <DialogContent sx={{ backgroundColor: '#FFF4B4', display: 'flex', alignItems: 'center', zIndex: 2 }}>
      <ErrorOutlineIcon sx={{ color: '#DCA500', marginRight: 1 }} /> {/* Icon color and margin */}
      <p id="warning-dialog-description" style={{ margin: 0 }}>
        {bodyText}
      </p>
    </DialogContent>
    <DialogActions sx={{ backgroundColor: '#FFF4B4', zIndex: 2, justifyContent: 'center', gap: '20px' }}>
      <Button
        onClick={handleWarningClose}
        sx={{
          color: '#0000BF',
          borderColor: '#0000BF',
          backgroundColor: 'white',
          border: '2px solid',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '0',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 191, 0.1)',
          }
        }}
      >
        Peruuta
      </Button>
      <Button
        onClick={handleProceed}
        sx={{
          color: '#FFFFFF',
          backgroundColor: '#0000BF',
          padding: '8px 16px',
          fontSize: '14px',
          fontWeight: 'bold',
          borderRadius: '0',
          '&:hover': {
            backgroundColor: '#0000A0',
          }
        }}
      >
        {buttonText}
      </Button>
    </DialogActions>
  </Dialog>)
}

export default WarningDialog;
