import React, { useState, useContext, useEffect, useCallback } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AuthContext from '../../../store/context/AuthContext';

const PerformancesFeedback = ({
  setSelectedValues,
  unit,
  setSelectedUnitId,
  radioItems,
  //answer,
  prevAnswerValue,
  prevAnswerSupervisorValue,
  updatedAnswer,
  updatedAnswerSupervisor,
  //answerSupervisor,
  //answerButton,
  //answerSupervisorButton
}) => {
  //const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState({ 
    Osaamistaito: prevAnswerValue === 1 ? 'Osaa ohjatusti' : 'Osaa itsenäisesti'
    //Itseaeviointi: prevAnswerValue === 1 ? 'Osaa ohajatusti' : (prevAnswerValue === 2 ? 'Osaa itsenäisesti' : '')
  });

  const auth = useContext(AuthContext);
  const user = auth.user;

  const updateSelectedValues = useCallback((selectedValue)=>{
    if(selectedRadio['Osaamistaito'] === selectedValue){
      setSelectedValues(0);
    } else {
      setSelectedValues(selectedValue === 'Osaa ohjatusti' ? 1: 2);
    }
  }, [selectedRadio, setSelectedValues]);

  useEffect(()=>{
        let isMounted = true;
        const fetchData = async ()=> {
          try {
            if (user&&user.role === 'customer' && prevAnswerValue !=null) {
              const updatedRadio = {
                Osaamistaito: 
                prevAnswerValue === 1
                ? 'Osaa ohjatusti' 
                : prevAnswerValue === 2 
                ? 'Osaa itsenäisesti' : 
                '',
            };
            if(isMounted){
              setSelectedRadio(updatedRadio);
              updateSelectedValues(
                prevAnswerValue === 1 ? 'Osaa ohjatusti' : 'Osaa itsenäisesti'
              );
            }
          } else if (user&& user.role === 'supervisor') {
            const updatedRadio = {
              Osaamistaito:
              prevAnswerSupervisorValue === 1
              ? 'Osaa ohjatusti'
              : prevAnswerSupervisorValue === 2
              ? "Osaa itsenäisesti"
              : '',
            };

            if(isMounted){
              setSelectedRadio(updatedRadio);
              updateSelectedValues(prevAnswerSupervisorValue)
            }
          }
        } catch (error) {
          console.log('Error fetch data', error);
        }
      };

      fetchData();
      return ()=>{
        isMounted && (isMounted= false);
      };
    },[
      prevAnswerValue,
      prevAnswerSupervisorValue,
      updatedAnswer,
      updatedAnswerSupervisor,
      user?.role,
      updateSelectedValues,
      user
    ]);

  const handleRadioChange = (e, unit, info) => {

    console.log('Clicked unit1', unit, 'info', info);

    if (!unit || !unit._id) {
      console.error('Unit or unit._id is undefined');
      return;
    }

    const selectedValue = e.target.value;
    setSelectedUnitId(unit._id);
  
    setSelectedRadio((prevValues)=>({
      ...prevValues,
      [info]: prevValues[info] === selectedValue ? '': selectedValue,
    }));
    updateSelectedValues(selectedValue);

    console.log('Clicked unit:', unit, 'Info:', info, 'Value:',selectedValue);
    console.log('Selected radio :',selectedRadio);
};

 // Tomoko!! Don't delete this code!!!
  /* const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file type and size
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        if (file.size <= 2 * 1024 * 1024) {
          setSelectedFiles([...selectedFiles, file]);
        } else {
          alert('File size exceeds the limit (Max 2 MB)');
        }
      }
    }
  }; */

  // Defining the background color based on the user role

  const getBackgroundColor = () => {
    if (
      selectedRadio['Osaamistaito'] === 'Osaa ohjatusti' ||
      selectedRadio['Osaamistaito'] === 'Osaa itsenäisesti'
    ) {
      if (user&&user?.role === 'supervisor') {
        return '#F6E2E6';
      } else if (user&&user?.role === 'customer') {
        return '#E2F5F3';
      }
    }
    return '#F2F2F2';
  };

  /* const radioItems = [
     {
      info: 'Itsearviointi',
      disabled: false,
      value: [0, 1, 2],
     },
  ] */

  const answerToShow = user&&user.role === 'supervisor' ? prevAnswerSupervisorValue : prevAnswerValue;

  return (
    <main
      className='feedbackpage__wrapper'
      style={{ backgroundColor: getBackgroundColor() }}
    >
      <div>
        {user&&user.role === 'customer' && (
          <div>
            <p>answer: {prevAnswerValue}</p>
          </div>
        )}
        {user&&user.role === 'supervisor' && (
          <div>
            <p>suopervisorAnswer : {prevAnswerSupervisorValue}</p>
          </div>
        )}
      </div>
      {radioItems.map((item,index)=>(
          <div key={index} className='first-div-style'>
            <p  style={{ width: '38%', marginTop: '10px' }}>{item.info}</p>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-form-control-label-placement'
                //name='position'
                //value={selectedRadio}
                name={item.info}
                value={selectedRadio[item.info] || ''}
                unit={unit}
                onChange={(e)=>handleRadioChange(e, unit, item.info)}
                id={item}
              >
                <FormControlLabel
                  type="radio"
                  label={answerToShow === 1 ? 'Osaa ohjatusti' : (answerToShow === 2 ? 'Osaa itsenäisesti': '')}
                  name="Osaa ohjatusti"
                  id="Osaa ohjatusti"
                  value={1}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      marginRight: '70px',
                    },
                  }}
                  control={
                    <Radio />
                  }
                 />
                <FormControlLabel
                  type="radio"
                  label={answerToShow === 1 ? 'Osaa ohjatusti' : (answerToShow === 2 ? 'Osaa itsenäisesti': '')}
                  name='Osaa itsenäisesti'
                  id="Osaa itsenäisesti"
                  value={2}
                  sx={{
                    '& .MuiSvgIcon-root': {
                      marginRight: '8%',
                    },
                  }}
                  onChange={(e) => handleRadioChange(e, unit, item.info)}
                  control={
                    <Radio /> 
                  }
                 />
              </RadioGroup>
            </FormControl>
          </div>
      ))}
    </main>
   );
  };

export default PerformancesFeedback;
