import { useState } from 'react';
import { updateEvaluationById } from '../../../api/evaluation';
import { Icon } from '@iconify/react';
import NotificationModal from '../../NotificationModal/NotificationModal';
import {
  Typography,
  IconButton,
  Box,
  DialogContent,
  TextField,
} from '@mui/material';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Button from '../../Button/Button';

const TeacherComment = ({
  assessmentId,
  selectedUnitId,
  assessment,
  evaluationId,
  evaluation,
  setEvaluation,
  getBackgroundColor
}) => {


  const [comment, setComment] = useState(assessment.comment.text);

  // Modal for teacher comment
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const cancelTeacherComment = () => {
    setComment(assessment.comment.text);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };
  const handlePenClick = () => {
    setIsCommentModalOpen(true);
  };
  const saveTeacherComment = async () => {
    try {
      const updatedAssessments = evaluation.units.map((unit) => {
        if (unit._id === selectedUnitId) {
          return {
            ...unit,
            assessments: unit.assessments.map((assessment) => {
              if (assessment._id === assessmentId) {
                return {
                  ...assessment,
                  comment: {
                    text: comment,
                  },
                };
              }
              return assessment;
            }),
          };
        }
        return unit;
      });

      // Update the evaluation state with the new assessments
      await updateEvaluationById(evaluationId, {
        units: updatedAssessments,
        selectedValues: {},
      });

      setEvaluation((prevEvaluation) => ({
        ...prevEvaluation,
        units: updatedAssessments,
      }));

      handleCloseCommentModal();

      // Update the evaluation in the local state
      const updateEvaluation = {
        ...evaluation,
        units: updatedAssessments,
      };
      console.log('Updated evaluation:', updateEvaluation);

      setEvaluation(updateEvaluation);
    } catch (error) {
      console.log('Error saving teacher comment:', error);
    }
  };

  return (
    <div
      className='feedback__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div
        className='first-div-style'
        style={{ width: '60%', marginLeft: '38%' }}
      >
        <p style={{ padding: '2px' }}>Osaa ohjatusti</p>
        <p style={{ padding: '4px' }}>Osaa itsenäisesti</p>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'flex-end' }}
        onClick={handlePenClick}
      >
        <button
          id='teacher-comment-button'
          className='teacher-comment-button-wrapper'
          style={{ backgroundColor: getBackgroundColor() }}
        >
          Lisää opettajan kommentti {/* </button> */}
          <Icon icon='ph:note-pencil-light' color='grey' fontSize='1.8rem' />
        </button>
      </div>
      {/* Teacher comment */}
      <NotificationModal
        type='info'
        hideIcon={true}
        open={isCommentModalOpen}
        dialogStyles={{
          dialogPaper: {
            borderLeft: 'none',
          },
          dialogTitle: {
            fontSize: '16px',
            fontWeight: 'bold',
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
            Lisää opettajan kommentti
          </Typography>
        }
        body={
          <>
            <IconButton
              aria-label='close'
              onClick={handleCloseCommentModal}
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
                <TextField
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                  id='outlined-multiline-static'
                  backgroundcolor='#FFFFFF'
                  border='black 2px solid'
                  fontSize='10px'
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
                        // borderColor: 'black',
                        border: '2px solid black',
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
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px 16px 16px 0',
                    marginTop: '20px',
                  }}
                >
                  <Button
                    text='Peruuta'
                    variant='contained'
                    style={{
                      textTransform: 'none',
                      backgroundColor: '#FFFFFF',
                      border: '2px solid #0000BF',
                      width: '152px',
                      height: '56px',
                      color: '#0000BF',
                      fontWeight: 'bold',
                      marginRight: '10px',
                    }}
                    onClick={cancelTeacherComment}
                  ></Button>
                  <Button
                    text='Tallenna'
                    variant='contained'
                    style={{
                      textTransform: 'none',
                      backgroundColor: '#0000BF',
                      width: '99px',
                      height: '56px',
                      color: '#FFFFFF',
                      border: 'none',
                    }}
                    // Save teacher's comment
                    onClick={saveTeacherComment}
                  ></Button>
                </Box>
              </Box>
            </DialogContent>
          </>
        }
        handleClose={handleCloseCommentModal}
      />
    </div>
  );
};

export default TeacherComment
