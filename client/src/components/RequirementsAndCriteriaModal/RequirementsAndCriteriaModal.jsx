import { useState } from 'react';
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
    // padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function CustomDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, fontSize: '12px' }} {...other}>
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

export default function RequirementsAndCriteriaModal({
  open,
  onClose,
  title,
  modalUnitName,
  requirementsTitle,
  criteria,
  hideCancelButton,
  onSave,
  body,
  hideRequirementsField,
  hideCriteriaField,
  hideSaveButton,
}) {
  const bgColor = '#E5F6FD';
  const color = '#0288D1';
  
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

  const handleClick = () => {
    // Check if the input value is empty
    if (inputValueCriteria.trim() === '') {
      setInputValueCriteria('• '); // Insert a bullet point
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key
    
    if (key === "Enter") {
      event.preventDefault()
      const { selectionStart, selectionEnd } = event.target
      
      setInputValueCriteria((oldValue => {
        const start = oldValue.slice(0, selectionStart)
        const end = oldValue.slice(selectionEnd)

        return `${start}\n• ${end}`
      }))

      setTimeout(() => { 
        event.target.setSelectionRange(selectionStart + 3, selectionStart + 3)
      }, 0)

      return
    }

    if (key === "Backspace") {
      return
    }
  }

  const onPaste = (event) => {
    event.preventDefault()
    const { selectionStart, selectionEnd } = event.target

    // Get pasted data via clipboard API
    const clipboardData = event.clipboardData || window.clipboardData;
    const pastedData = clipboardData.getData('Text');


  
    setInputValueCriteria((oldValue => {
      const start = oldValue.slice(0, selectionStart)
      const end = oldValue.slice(selectionEnd)

      const formattedData = `${start}${pastedData}${end}`
        .split("\n")
        .map((line) => line.startsWith("• ") ? line : `• ${line}`)
        .join("\n")

      return formattedData
    }))

    setTimeout(() => { 
      event.target.setSelectionRange(selectionStart, selectionStart)
    }, 0)

  }

  const handleClose = () => {
    onClose();
  };

  const handleSubmitCancelButton = () => {
    /* onSave(inputValueTitle, inputValueCriteria); */
    setInputValueTitle('');
    setInputValueCriteria('');
    handleClose();
  };
  const handleSubmit = () => {
    console.log('Submitted Title:', inputValueTitle);
    console.log('Submitted criteria:', inputValueCriteria);
    onSave(inputValueTitle, inputValueCriteria);
    setInputValueTitle('');
    setInputValueCriteria('');
    handleClose();
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
          // borderLeft: 'solid 6px',
          color,
          width: '100%',
          maxWidth: '350px',
          '@media (min-width:600px)': {
            maxWidth: '400px', // adjust this value as needed
          },
          '& .MuiDialogTitle-root': {
            fontSize: '16px',
            fontWeight: 'bold',
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
        {title}
      </CustomDialogTitle>
      <DialogContent>
        <Box sx={{ color: 'black' }}>
          {body}
          <Typography
            gutterBottom
            sx={{
              fontSize: '12px',
              fontWeight: 'bold',
            }}
          >
            {modalUnitName}
          </Typography>
          {!hideRequirementsField && (
            <>
              <Typography
                gutterBottom
                sx={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginTop: '10px',
                }}
              >
                {requirementsTitle}
              </Typography>
              <TextField
                value={inputValueTitle}
                onChange={(e) => handleInputChange(e, 1)}
                id='outlined-multiline-static'
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
          {!hideCriteriaField && (
            <>
              <Typography
                gutterBottom
                sx={{
                  fontSize: '12px',
                  fontWeight: 'bold',
                  marginTop: '10px',
                }}
              >
                {criteria}
              </Typography>
              <TextField
                value={inputValueCriteria}
                onChange={(e) => handleInputChange(e, 2)}
                onKeyDown={handleKeyDown}
                onPaste={onPaste}
                onClick={handleClick}
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
                    '& .MuiInputBase-input': {
                      fontSize: '13px',
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
              // display: 'flex',
              // justifyContent: 'space-between',
              // width: '100%',
              // padding: '16px 16px 16px 0',
              marginTop: '10px',
              textAlign: 'center',
              // marginBottom: '20px',
            }}
          >
            {!hideCancelButton && (
              <Button
                onClick={handleSubmitCancelButton}
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#FFFFFF',
                  border: '2px solid #0000BF',
                  // width: '125px',
                  height: '56px',
                  color: '#0000BF',
                  borderRadius: '0',
                  fontWeight: 'bold',
                }}
              >
                Peruuta
              </Button>
            )}
            {!hideSaveButton && (
              <Button
                onClick={handleSubmit}
                sx={{
                  textTransform: 'none',
                  backgroundColor: '#0000BF',
                  width: '99px',
                  height: '56px',
                  color: '#FFFFFF',
                  borderRadius: '0',
                  // fontWeight: 'bold',
                  fontSize: '16px',
                  '&:hover': {  // Styles for hover state
                    backgroundColor: '#0000BF',  // Same as default
                    color: '#FFFFFF',  // Same as default
                  },
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
