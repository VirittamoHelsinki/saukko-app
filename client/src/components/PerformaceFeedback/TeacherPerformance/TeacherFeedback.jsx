import { useEffect, useMemo } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import TeacherComment from './TeacherComment';

const TeacherPerformanceFeedBack = ({
  evaluation, setEvaluation, assessment, unit, selectedRadio, handleRadioChange, unitId, currentUser
}) => {


  const valueMapping = {
    1: 'Osaa ohjatusti',
    2: 'Osaa itsenäisesti',
    'Osaa ohjatusti': 1,
    'Osaa itsenäisesti': 2,
  };

  const infodata = useMemo(() => {
    return evaluation ? evaluation.units.flatMap((unit) => {
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
    }) : [
      { info: 'Itsearviointi', disabled: true, answer: '' },
      { info: 'TPO:n havainto', disabled: true, answerSupervisor: '' },
      { info: 'Opettajan merkintä', disabled: false, answerTeacher: '', comment: { text: '' } }
    ];
  }, [evaluation]);

  const infodataForSelectedAssessment = useMemo(() => {
    return infodata.filter(data => data.assessmentId === assessment._id);
  }, [infodata, assessment._id]);

  useEffect(() => {
    // Initialize selectedRadio state based on radioAnswers or with default empty values
    infodataForSelectedAssessment.reduce((acc, item) => {
      if (item.info === 'Opettajan merkintä') {
        acc[item.info] = item.answerTeacher || '';
        handleRadioChange([item.info], acc[item.info], assessment._id)
      }
      if (item.info === 'Itsearviointi') {
        acc[item.info] = item.answer || '';
        handleRadioChange([item.info], acc[item.info], assessment._id)
      }
      if (item.info === 'TPO:n havainto') {
        acc[item.info] = item.answerSupervisor || ''
        handleRadioChange([item.info], acc[item.info], assessment._id)
      }
      return acc;
    }, {});

  }, [assessment._id, handleRadioChange, infodataForSelectedAssessment]);

  const getBackgroundColor = () => {
    // if (
    //   selectedRadio === 'Osaa ohjatusti' ||
    //   selectedRadio === 'Osaa itsenäisesti'
    // ) {
    if (currentUser?.role === 'teacher') {
      return '#FFF4B4';
    }
    /*     } */
    return assessment.answerTeacher !== 0 ? '#FFF4B4' : '#F2F2F2';
  };

  return (
    <div className='feedback__wrapper'
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
                  onChange={(e) => handleRadioChange(item.info,
                    valueMapping[e.target.value], assessment._id)}
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
                      />
                    }
                    checked={selectedRadio[item.info] === 1}
                    label=""
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
                      />
                    }
                    checked={selectedRadio[item.info] === 2}
                    label=""
                  />

                </RadioGroup>
              </FormControl>
            </div>
          </div>
        ))}{' '}
        <TeacherComment
          assessmentId={assessment._id}
          selectedUnitId={unitId}
          assessment={assessment}
          evaluationId={evaluation._id}
          evaluation={evaluation}
          setEvaluation={setEvaluation}
          getBackgroundColor={getBackgroundColor}
        />
      </div>
    </div>
  );
};

export default TeacherPerformanceFeedBack;

