import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Icon } from '@iconify/react';
import Typography from '@mui/material/Typography';

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

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);

  let icon = 'material-symbols:info';
  let bgColor = '#fff';
  let color = '#000';

  if (props.type === 'alert') {
    icon = 'zondicons:exclamation-solid';
    bgColor = '#fff4b4';
    color = '#d18200';
  } else if (props.type === 'info') {
    icon = 'material-symbols:info';
    bgColor = '#e5eff8';
    color = '#0062b9';
  } else if (props.type === 'success') {
    icon = 'material-symbols:check-circle';
    bgColor = '#e2f5f3';
    color = '#007a64';
  } else if (props.type === 'warning') {
    icon = 'material-symbols:warning';
    bgColor = '#f6e2e6';
    color = '#b01038';
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant='outlined' onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        sx={{
          '& .MuiDialog-paper': {
            background: bgColor,
            borderLeft: 'solid 8px',
            color,
          },
          '& .MuiDialogTitle-root': {
            marginLeft: '35px',
            fontSize: '0.875 rem',
            fontWeight: '700',
          },
        }}
      >
        {/* Props available for NotificationModal's icon: alert, info, success, warning  */}

        <Icon
          icon={icon}
          style={{
            position: 'absolute',
            left: '16px',
            top: '16px',
            fontSize: '27px',
            color: color,
          }}
        />

        <BootstrapDialogTitle
          id='customized-dialog-title'
          onClose={handleClose}
        >
          {props.title}
        </BootstrapDialogTitle>
        <DialogContent>
          <Typography gutterBottom>{props.body}</Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}
