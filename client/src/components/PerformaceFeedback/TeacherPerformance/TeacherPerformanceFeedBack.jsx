import React, { useContext, useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';
import { Icon } from '@iconify/react';
import RequirementsAndCriteriaModal from '../../RequirementsAndCriteriaModal/RequirementsAndCriteriaModal';
import InternalApiContext from '../../../store/context/InternalApiContext';

const TeacherPerformanceFeedBack = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
  setHasUnsavedChanges,
}) => {
  const [selectedRadio, setSelectedRadio] = useState({});
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [hasChanged, setHasChanged] = useState(false);
  //Fetch evaluation and units from store
  const { evaluation } = useContext(InternalApiContext);

  // Modal for teacher comment
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

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
      if (user?.role === 'teacher') {
        return '#FFF4B4';
      }
    }
    return '#F2F2F2';
  };

  // Get data from db
  const infodata = evaluation.units.flatMap((unit) => {
    return unit.assessments.flatMap((assessment) => [
      {
        info: 'Itsearviointi',
        disabled: true,
        unitId: unit._id,
        assessment: assessment._id,
        answer: assessment.answer,
      },
      {
        info: 'TPO:n havainto',
        disabled: true,
        unitId: unit._id,
        answerSupervisor: assessment.answerSupervisor,
      },
      {
        info: 'Opettajan merkintä',
        disabled: false,
        unitId: unit._id,
        answerTeacher: assessment.answerTeacher,
      },
    ]);
  });

  const infodataForSelectedUnit = infodata.filter(
    (data) => data.unitId === unit._id
  );

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
        {infodataForSelectedUnit.map((item, index) => (
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
        <RequirementsAndCriteriaModal
          open={isCommentModalOpen}
          onClose={handleCloseCommentModal}
          title='Lisää opetaajan kommentti'
          hideRequirementsField={true}
          hideCriteriaField={false}
          hideCancelButton={false}
          onSave={(comment) => {
            console.log('Comment:', comment);
          }}
        />
      </div>
    </main>
  );
};

export default TeacherPerformanceFeedBack;
