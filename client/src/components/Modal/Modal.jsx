import React from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function BasicModal({ open, handleClose}) {
  let bgColor = '#e5eff8';
  let color = '#0062b9';

  return (
    <div>
      <BootstrapDialog
        open={open}
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        sx={{
          '& .MuiDialog-paper': {
            background: bgColor,
            borderLeft: 'solid 8px',
            color,
          },
          '& .MuiDialogTitle-root': {
            fontSize: '0.875 rem',
            fontWeight: '700',
          },
        }}
      >
        <IconButton
          aria-label='close'
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <BootstrapDialogTitle
          id='customized-dialog-title'
          variant='h6'
          component='h2'
          textAlign='center'
          fontWeight='bold'
        >
          Kritteerit
        </BootstrapDialogTitle>
        <DialogContent id='modal-modal-description'>
          <Box
            backgroundColor='#FFFFFF'
            border='black 2px solid'
            margin='0 1rem 3rem'
          >
            <Typography padding='1rem'>
              <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
              <p>
                Minima enim dignissimos aliquam et animi accusantium illo
                laboriosam pariatur inventore!
              </p>
              <p>
                Fugit ullam debitis hic doloremque aperiam eum temporibus
                deserunt amet similique.
              </p>
            </Typography>
          </Box>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
