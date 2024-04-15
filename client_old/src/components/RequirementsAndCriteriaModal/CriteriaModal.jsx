import React from 'react';
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
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomDialogTitle(props) {
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

export default function CriteriaModal({ open, handleClose }) {
  let bgColor = '#e5eff8';
  let color = '#0062b9';

  return (
    <div>
      <CustomDialog
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
            color: 'black',
          }}
        >
          <CancelOutlinedIcon />
        </IconButton>
        <CustomDialogTitle
          id='customized-dialog-title'
          variant='h6'
          component='h2'
          textAlign='center'
          fontWeight='bold'
        >
          Kritteerit
        </CustomDialogTitle>
        <DialogContent id='modal-modal-description'>
          <Box
            backgroundColor='#FFFFFF'
            border='black 2px solid'
            margin='0 1rem 3rem'
          >
            <Typography padding='1rem'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis
              culpa doloremque ea commodi magnam excepturi adipisci, at libero.
              Quod dolorem pariatur voluptatem, animi quis mollitia consequatur
              debitis dolorum praesentium corporis.{' '}
            </Typography>
          </Box>
        </DialogContent>
      </CustomDialog>
    </div>
  );
}
