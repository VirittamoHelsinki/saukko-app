import React, { useContext, useState, useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { Icon } from '@iconify/react';
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useAuthContext } from '../../../store/context/authContextProvider';
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
import { updateEvaluationById } from '../../../api/evaluation';

const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  selectedUnitId,
  setSelectedUnitId,
  setHasUnsavedChanges,
  assessment,
  setSelectedAssessmentId,
  evaluationId,
}) => {
  const assessmentId = assessment._id;
  const [selectedRadio, setSelectedRadio] = useState({});
  const { currentUser } = useAuthContext();
  // eslint-disable-next-line no-unused-vars
  const [hasChanged, setHasChanged] = useState(false);
  //Fetch evaluation and units from store
  const { evaluation, setEvaluation } = useContext(InternalApiContext);
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

  const handleRadioChange = (e, unit, info, value) => {
    setSelectedRadio((prevValues) => ({
      ...prevValues,
      [info]: prevValues[info] === value ? '' : value,
    }));
    setHasChanged(true);
    if (unit._id) {
      setSelectedUnitId(unit._id); // This is the unit id
      setSelectedAssessmentId(assessment._id);
      setHasUnsavedChanges(true);
    } else {
      setHasUnsavedChanges(false);
    }
    if (e.target) {
      if (selectedRadio === e.target.value) {
        e.target.checked = false;
        setSelectedRadio('');
        setSelectedValues(0);
        setHasChanged(false);
        setHasUnsavedChanges(false);
      } else {
        setSelectedRadio(e.target.value);
        if (e.target.value === 'Osaa ohjatusti') {
          setSelectedValues(1);
        } else if (e.target.value === 'Osaa itsenäisesti') {
          setSelectedValues(2);
        }
      }
      console.log(e.target.value);
    }
  };

  const getBackgroundColor = () => {
    if (
      selectedRadio === 'Osaa ohjatusti' ||
      selectedRadio === 'Osaa itsenäisesti'
    ) {
      if (currentUser?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return assessment.answerTeacher !== 0 ? '#FFF4B4' : '#F2F2F2';
  };

  // Get data from db
  const infodata = evaluation.units.flatMap((unit) => {
    return unit.assessments.flatMap((assessment) => [
      {
        info: 'Itsearviointi',
        disabled: true,
        unitId: unit._id,
        assessmentId: assessment._id,
        answer: assessment.answer,
      },
      {
        info: 'TPO:n havainto',
        disabled: true,
        unitId: unit._id,
        assessmentId: assessment._id,
        answerSupervisor: assessment.answerSupervisor,
      },
      {
        info: 'Opettajan merkintä',
        disabled: false,
        unitId: unit._id,
        assessmentId: assessment._id,
        answerTeacher: assessment.answerTeacher,
        comment: assessment.comment,
      },
    ]);
  });

  const infodataForSelectedAssessment = infodata.filter(
    (data) => data.assessmentId === assessment._id
  );

  useEffect(() => {
    setSelectedUnitId(unit._id);
    setSelectedAssessmentId(assessment._id);
  }, [unit, assessment]);

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
    <main
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
      <div>
        {infodataForSelectedAssessment.map((item, index) => (
          <div key={index} className='first-div-style'>
            <p style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <div style={{ marginTop: '10px' }}>
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby='demo-form-control-label-placement'
                  name={item.info}
                  value={selectedRadio[item.info] || ''}
                  unit={unit}
                  onClick={(e) => handleRadioChange(item.info, e, unit)}
                >
                  <FormControlLabel
                    value='Osaa ohjatusti'
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '70px',
                      },
                    }}
                    control={
                      <Radio
                        disabled={item.info !== 'Opettajan merkintä'}
                        onChange={(e) => handleRadioChange(e, unit, item.info)}
                        checked={
                          (item.info === 'Opettajan merkintä' &&
                            selectedRadio === 'Osaa ohjatusti') ||
                          item.answer === 1 ||
                          item.answerSupervisor === 1 ||
                          item.answerTeacher === 1
                        }
                      />
                    }
                  />
                  <FormControlLabel
                    value='Osaa itsenäisesti'
                    sx={{
                      '& .MuiSvgIcon-root': {
                        marginRight: '8%',
                      },
                    }}
                    control={
                      <Radio
                        disabled={item.info !== 'Opettajan merkintä'}
                        onChange={(e) => handleRadioChange(e, unit, item.info)}
                        checked={
                          (item.info === 'Opettajan merkintä' &&
                            selectedRadio === 'Osaa itsenäisesti') ||
                          item.answer === 2 ||
                          item.answerSupervisor === 2 ||
                          item.answerTeacher === 2
                        }
                      />
                    }
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ))}{' '}
        <div
          className='teacher-comment-button-wrapper'
          onClick={handlePenClick}
        >
          <button
            className='teacher-comment-button'
            style={{ backgroundColor: getBackgroundColor() }}
          >
            Lisää opettajan kommentti{' '}
          </button>
          <Icon icon='ph:note-pencil-light' color='grey' fontSize='1.8rem' />
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
        {/* <RequirementsAndCriteriaModal
          open={isCommentModalOpen}
          onClose={handleCloseCommentModal}
          title='Lisää opettajan kommentti'
          hideRequirementsField={true}
          hideCriteriaField={false}
          hideCancelButton={false}
          onSave={(comment) => {
            console.log('Comment:', comment);
          }}
        /> */}
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;
