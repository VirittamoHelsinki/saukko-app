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

const ATVAndCriteriaModal = ({
  handleCloseAssessmentModal,
  assessment,
  assessmentId,
  unitId,
  setDegreeDetails,
  isAssessmentModalOpen,
  unit,
  saveATVAndCriteria,
}) => {
//   console.log("🚀 ~ isAssessmentModalOpen:", isAssessmentModalOpen)
  return (
    <NotificationModal
      type='info'
      open={isAssessmentModalOpen}
      onClose={handleCloseAssessmentModal}
      hideIcon={true}
      dialogStyles={{
        dialogTitle: {
          marginLeft: '5px',
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
          Ammattitaitovaatimuksen muokkaus
        </Typography>
      }
      sx={{ minWidth: '100%' }}
      body={
        <>
          <IconButton
            aria-label='close'
            onClick={handleCloseAssessmentModal}
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
          <DialogContent>
            <Box>
              <Typography
                sx={{
                  fontSize: '17px',
                  fontWeight: 'bold',
                  marginBottom: '10px',
                }}
              >
                {unit.name.fi}
              </Typography>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                }}
              >
                Ammattitaitovaatimuksen nimi
              </Typography>
              <TextField
                key={assessment._id}
                value={
                  assessment._id === assessmentId ? assessment.name.fi : ''
                }
                id='outlined-multiline-static'
                multiline={assessment.name.fi.length > 10}
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    units: prevState.units?.map((u) => {
                      if (u._id === unitId) {
                        return {
                          ...u,
                          assessments: u.assessments?.map((a) => {
                            if (a._id === assessmentId) {
                              return {
                                ...a,
                                name: {
                                  ...a.name,
                                  fi: event.target.value,
                                },
                              };
                            }
                            return a;
                          }),
                        };
                      }
                      return u;
                    }),
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
                    },
                  },
                  width: '100%',
                  backgroundColor: 'white',
                  marginTop: '8px',
                  overflow: 'auto',
                }}
              ></TextField>
              <Typography
                sx={{
                  fontSize: '15px',
                  fontWeight: 'bold',
                  marginTop: '20px',
                }}
              >
                Kriteerit
              </Typography>
              <TextField
                value={
                  assessment._id === assessmentId &&
                  assessment.criteria &&
                  assessment.criteria[0]
                    ? assessment.criteria[0].fi
                    : ''
                }
                id='outlined-multiline-static'
                multiline
                onChange={(event) => {
                  setDegreeDetails((prevState) => ({
                    ...prevState,
                    units: prevState.units?.map((u) => {
                      if (u._id === unitId) {
                        return {
                          ...u,
                          assessments: u.assessments?.map((a) => {
                            if (a._id === assessmentId) {
                              return {
                                ...a,
                                criteria: [
                                  {
                                    ...a.criteria[0],
                                    fi: event.target.value,
                                  },
                                ],
                              };
                            }
                            return a;
                          }),
                        };
                      }
                      return u;
                    }),
                  }));
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderRadius: '0',
                      // border: 'black 2px solid',
                      borderColor: 'black',
                      borderWidth: '1px',
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
                  marginBottom: '30px',
                  width: '50%',
                  backgroundColor: '#0000BF',
                  color: 'white',
                  border: 'none',
                }}
                onClick={saveATVAndCriteria}
              ></Button>
            </Box>
          </DialogContent>
        </>
      }
    />
  );
};

export default ATVAndCriteriaModal;
