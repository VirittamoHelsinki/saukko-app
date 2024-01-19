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
          <CancelOutlinedIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function RequirementsAndCriteriaModal({ open, handleClose, onSave }) {
  let bgColor = '#e5eff8';
  let color = '#0062b9';
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

  const handleSubmit = () => {
    console.log('Submitted value:', inputValueTitle, inputValueCriteria);
    onSave(inputValueTitle, inputValueCriteria);
    setInputValueTitle('');
    setInputValueCriteria('');
  };

  return (
    <CustomDialog
      open={open}
      onClose={handleClose}
      aria-labelledby='customized-dialog-title'
      fullWidth
      maxWidth='sm'
      sx={{
        '& .MuiDialog-paper': {
          background: bgColor,
          borderLeft: 'solid 5px',
          color,
          width: '100%',
          maxWidth: '500px',
          '@media (min-width:600px)': {
            maxWidth: '800px', // adjust this value as needed
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
      <CustomDialogTitle
        variant='h6'
        component='h6'
        fontWeight='bold'
        sx={{ fontSize: '17px' }}
      >
        Lisää ammattitaitovaatimusta
      </CustomDialogTitle>
      <DialogContent
        sx={{
          marginLeft: '11px',
        }}
      >
        <Typography
          variant='subtitle1'
          fontWeight='bold'
          marginBottom={1}
          sx={{ fontSize: '12px' }}
        >
          Osan tutkinnon nimi
        </Typography>
        <Typography
          variant='subtitle1'
          fontWeight='bold'
          sx={{ fontSize: '12px' }}
        >
          Ammattitaitovaatimuksen nimi
        </Typography>
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
        >
          <Typography padding='1rem'></Typography>
        </TextField>
        <Typography
          variant='subtitle1'
          fontWeight='bold'
          marginTop={1}
          sx={{ fontSize: '12px' }}
        >
          Kriteerit
        </Typography>
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
      </DialogContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          marginBottom: '20px',
        }}
      >
        <Button
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            backgroundColor: '#0000BF',
            width: '99px',
            height: '56px',
            color: '#FFFFFF',
            borderRadius: '0',
            '&:hover': {
              backgroundColor: '#0000BF',
            },
          }}
        >
          Tallenna
        </Button>
      </Box>
    </CustomDialog>
  );
}
