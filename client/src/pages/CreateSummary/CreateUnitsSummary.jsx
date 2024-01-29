import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import useStore from '../../store/zustand/formStore';
import { postDegree } from '../../api/degree';
 
const CreateUnitesSummary = ({ allInternalDegrees }) => {
  console.log("🚀 ~ DegreeDetail ~ allInternalDegrees:", allInternalDegrees)
  const { degreeId } = useParams();
  console.log("🚀 ~ DegreeDetail ~ degreeId:", degreeId)
  const [degreeDetails, setDegreeDetails] = useState(null);
  console.log("🚀 ~ DegreeDetail ~ degreeDetails:", degreeDetails)

  //get values from store management
  const { diaryNumber, regulationDate, validFrom, expiry, transitionEnds } = useStore();
 
  const handleSubmit = async()=>{
    const degreeData ={
      diaryNumber: parseDate(degreeDetails.diaryNumber),
      regulationDate: parseDate(degreeDetails.regulationDate),
      validFrom: parseDate(degreeDetails.validFrom),
      expiry: parseDate(degreeDetails.expiry),
      transitionEnds: parseDate(degreeDetails.transitionEnds),
    }
  }

  //const navigate = useNavigate();
  //const params = useParams();
  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find((degree) => degree._id === degreeId);
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);
  console.log('DegreeDatails:', degreeDetails)

  if (!degreeDetails) {
    return <div>Loading...</div>;
  }

  
  // Remove HTML p tags from degree assessment ()
  //const regex = /(<([^>]+)>)/gi;
  //const degreeDescriptionCleaned = degreeDescription.replace(regex, '');
  
   function parseDate(dateString) {
    const datePattern = /^\d{2}\.\d{2}.\d{4}$/;
    
    if (datePattern.test(dateString)) {
      const [day, month, year] = dateString.split('.');
      const date = new Date(year, month - 1, day);
      return date;
    } else {
      return null;
    }
  }
 
  
  // Example usage
  /* const regulationDate = "2021-12-16T22:00:00.000Z";
  const formattedDate = formatDate(regulationDate);
  console.log(formattedDate); */

// Find the specific degree details based on degreeId
//   const degreeDetails = allInternalDegrees.find((degree) => degree._id === degreeId);
 
//   if (!degreeDetails) {
//     return <div>Details not found.</div>;
//   }
 
  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
      <section className='summary__container'>
      <h1 className='degree-title'>{degreeDetails.name?.fi}</h1>
      <div className='section-title'>Tutkinnonosat ja tehtävät</div>
        <div className='summary__container--box'>
          {/* Display other degree details as needed */}
          {degreeDetails.units.map((unit, index) => (
            <div key={index} className='unit-container'>
              <strong>{unit.name.fi}</strong>
              {unit.assessments && unit.assessments.map((assessment, assessmentIndex)=>(
                <p key={assessmentIndex}>
                  {assessmentIndex+1}. {assessment.name?.fi}
                </p>
              ))}
              {/* {unit.assessments && unit.assessments.map((assessment, assessmentIndex)=>(
                <p key={assessmentIndex}>{assessmentIndex+1}. {assessment.name?.fi}</p>
              ))} */}
            </div>
          ))}
      <div className='section-title'>Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box'>
          {degreeDetails.description.fi ? (degreeDetails.description.fi)
          : (<p>No description data.</p>)}
        </div>
      <div className='section-title'>Tutkintotiedot</div>
        <ul className='summary__container--box'>
            <strong>Määräyksen diaarinumero</strong>
            <li>{degreeDetails.diaryNumber}</li>
            <strong> Määräyksen päätöspäivämäärä</strong>
            <li>{degreeDetails.regulationDate}</li>
            <strong>Voimaantulo</strong>
            <li>{degreeDetails.validFrom}</li>
            <strong>Voimassaolon päättyminen</strong>
            <li>{degreeDetails.expiry}</li>
            <strong>Siirtymäajan päättymisaika</strong>
            <li>{degreeDetails.transitionEnds}</li>
          </ul>
        <PageNavigationButtons
          handleBackText={'Takaisin'}
          //handleBack={() =>navigate(`/degrees/${params.degreeId}/units/tasks`)}
          //handleForward={handleSubmit}
          forwardButtonText={'Muokkaa tiedot'}
        />
      </div>
    </section>
    <UserNav />
    </main>
  );
};
 
export default CreateUnitesSummary;
 


/*
// Import react packages & dependencies
import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import Zustand store and custom context
import useStore from '../../store/zustand/formStore';
import useUnitsStore from '../../store/zustand/unitsStore';
import ExternalApiContext from '../../store/context/ExternalApiContext';
import InternalApiContext from '../../store/context/InternalApiContext';

// Import components

import UserNav from '../../components/UserNav/UserNav';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';

import { postDegree } from '../../api/degree';

function CreateUnitsSummary() {
  const navigate = useNavigate();
  const params = useParams();

  // Get values from store management
  const {
    degreeName,
    diaryNumber,
    regulationDate,
    validFrom,
    expiry,
    transitionEnds,
  } = useStore();
  const { degree, degreeFound } = useContext(ExternalApiContext);
  const { allInternalDegrees, setAllInternalDegrees } = useContext(InternalApiContext);
  const { checkedUnits } = useUnitsStore();

  const [response, setResponse] = useState(null)

  // Remove HTML p tags from degree description/assessment
  //const regex = /(<([^>]+)>)/gi;
  //const degreeDescriptionCleaned = degreeDescription.replace(regex, '');

  function parseDate(dateString) {
    const datePattern = /^\d{2}\.\d{2}.\d{4}$/;
    

    if (datePattern.test(dateString)) {
      const [day, month, year] = dateString.split('.');
      const date = new Date(year, month - 1, day);
      return date;
    } else {
      return null;
    }
  }
  
    const handleSubmit = async () => {
    
    const degreeData = {
      diaryNumber: diaryNumber ? diaryNumber : degree.diaryNumber,
      eduCodeValue: degreeFound ? degree.eduCodeValue : '',
      name: {
        fi: degreeName ? degreeName : degree.name.fi,
        sv: degreeFound ? degree.name.sv : '',
        en: degreeFound ? degree.name.en : '',
      },
      /* description: {  //ASSESSMENT!!!
        fi: degreeDescription ? degreeDescriptionCleaned : degree.description.fi,
        sv: degreeFound ? degree.description.sv : '',
        en: degreeFound ? degree.description.en : '',
      }, 
/*      archived: false,
      infoURL: degree.examInfoURL,
      units: checkedUnits,
      regulationDate: parseDate(regulationDate),
      transitionEnds: parseDate(transitionEnds),
      validFrom: parseDate(validFrom),
      expiry: parseDate(expiry),
    };
    console.log('Data for post request:', degreeData)

    // Send post request
    const response = await postDegree(degreeData);
    console.log('response', response)
    // Save response to state
    setResponse(response);

    // Save degree to context
    setAllInternalDegrees([...allInternalDegrees, response])

  }; 
  return (
    <main className='summary__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Tutkintojen hallinta' />
      <section className='summary__container'>
        <h1 className='degree-title'>{degreeName ? degreeName: degree.name?.fi}</h1>
        <div className='section-title'>Tutkinnonosat ja tehtävät </div>
        <div className='summary__container--box'>
          {checkedUnits.map((unit, index) => (
            <div key={index} className='unit-container'>
              <strong>{unit.name.fi}</strong>
              {unit.assessments && unit.assessments.map((assessment, index) => (
                <p key={index}>{index+1}. {assessment.name.fi}</p>
              ))}
            </div>
          ))}
        </div>
        {/* <div className='section-title'>Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box'>
          {degreeDescriptionCleaned}
        </div>
 }
        <div className='section-title'>Tutkintotiedot</div>
        <ul className='summary__container--box'>
          <strong>Määräyksen diaarinumero</strong>
          <li>{diaryNumber}</li>
          <strong> Määräyksen päätöspäivämäärä</strong>
          <li>{regulationDate}</li>
          <strong>Voimaantulo</strong>
          <li>{validFrom}</li>
          <strong>Voimassaolon päättyminen</strong>
          <li>{expiry}</li>
          <strong>Siirtymäajan päättymisaika</strong>
          <li>{transitionEnds}</li>
        </ul>

        <PageNavigationButtons
          //handleBack={() =>navigate(`/degrees/${params.degreeId}/units/tasks`)}
          handleForward={handleSubmit}
          forwardButtonText={'Tallenna tiedot'}
        />
      </section>
      <UserNav />
    </main>
  );
}

export default CreateUnitsSummary;**/