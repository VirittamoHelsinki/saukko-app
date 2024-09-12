import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
    backgroundColor: "#F00",
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
    backgroundColor: "#F00",
  },
}));

const CustomDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CancelOutlinedIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

const ClientEditModal = ({ open, handleClose }) => {
  return (
    <CustomDialog open={open} handleClose={handleClose} >
      <CustomDialogTitle>Hello world</CustomDialogTitle>
      <p>hello world</p>
    </CustomDialog>
  )
}

export default ClientEditModal