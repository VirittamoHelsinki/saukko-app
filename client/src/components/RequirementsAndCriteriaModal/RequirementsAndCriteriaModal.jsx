import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function RequirementsAndCriteriaModal(props) {
  let bgColor = '#E5F6FD';
  let color = '#0288D1';
  const [inputValueTitle, setInputValueTitle] = useState('');
  const [inputValueCriteria, setInputValueCriteria] = useState('');

  const handleInputChange = (event, inputField) => {
    const value = event.target.value;

    if (inputField === 1) {
      setInputValueTitle(value);
    } else if (inputField === 2) {
      setInputValueCriteria(value);
    }
  };

  const handleClose = () => {
    props.onClose();
  };

  const handleSubmitCancelButton = () => {
    props.onSave(inputValueTitle, inputValueCriteria);
    setInputValueTitle('');
    setInputValueCriteria('');
    // handleClose();
  };
  const handleSubmit = () => {
    console.log('Submitted Title:', inputValueTitle);
    console.log('Submitted criteria:', inputValueCriteria);
    props.onSave(inputValueTitle, inputValueCriteria);
    setInputValueTitle('');
    setInputValueCriteria('');
    handleClose();
  };

  return (
    <CustomDialog
      open={props.open}
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      fullWidth
      maxWidth='sm'
      sx={{
        '& .MuiDialog-paper': {
          background: bgColor,
          borderLeft: 'solid 6px',
          color,
          width: '100%',
          maxWidth: '350px',
          '@media (min-width:600px)': {
            maxWidth: '400px', // adjust this value as needed
          },
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
      <CustomDialogTitle id='customized-dialog-title'>
        {props.title}
      </CustomDialogTitle>
      <DialogContent>
        <Box sx={{ color: 'black', marginBottom: '1rem' }}>
          {props.body}
          <Typography gutterBottom>{props.modalUnitName}</Typography>
          {!props.hideRequirementsField && (
            <>
              <Typography gutterBottom>{props.requirementsTitle}</Typography>
              <TextField
                value={inputValueTitle}
                onChange={(e) => handleInputChange(e, 1)}
                id='outlined-multiline-static'
                backgroundColor='#FFFFFF'
                border='black 2px solid'
                fontSize='10px'
                multiline
                variant='outlined'
                sx={{
                  width: '95%',
                  borderColor: 'black',
                  borderRadius: '0',
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                      borderWidth: '2px',
                      borderRadius: '0',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              ></TextField>
            </>
          )}
          {!props.hideCriteriaField && (
            <>
              <Typography gutterBottom>{props.criteria}</Typography>
              <TextField
                value={inputValueCriteria}
                onChange={(e) => handleInputChange(e, 2)}
                id='outlined-multiline-static'
                rows={8}
                cols={25}
                multiline
                variant='outlined'
                sx={{
                  width: '95%',
                  borderColor: 'black',
                  borderRadius: '0',
                  backgroundColor: 'white',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'black',
                      borderWidth: '2px',
                      borderRadius: '0',
                    },
                    '&:hover fieldset': {
                      borderColor: 'black',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'black',
                    },
                  },
                }}
              >
                <Typography padding='1rem'></Typography>
              </TextField>
            </>
          )}

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              // width: '100%',
              padding: '16px 16px 16px 0',
              marginTop: '20px',
              marginBottom: '20px',
            }}
          >
            {!props.hideCancelButton && (
              <Button
                onClick={handleSubmitCancelButton}
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #0000BF',
                  width: '125px',
                  height: '56px',
                  color: '#0000BF',
                  borderRadius: '0',
                  fontWeight: 'bold',
                }}
              >
                Peruuta
              </Button>
            )}
            {!props.hideSaveButton && (
              <Button
                onClick={handleSubmit}
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#0000BF',
                  width: '99px',
                  height: '56px',
                  color: '#FFFFFF',
                  borderRadius: '0',
                  fontWeight: 'bold',
                }}
              >
                Tallenna
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </CustomDialog>
  );
}
