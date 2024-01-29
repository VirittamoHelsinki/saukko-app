import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
 
const CreateUnitesSummary = ({ allInternalDegrees }) => {
  console.log("🚀 ~ DegreeDetail ~ allInternalDegrees:", allInternalDegrees)
  const { degreeId } = useParams();
  console.log("🚀 ~ DegreeDetail ~ degreeId:", degreeId)
  const [degreeDetails, setDegreeDetails] = useState(null);
  console.log("🚀 ~ DegreeDetail ~ degreeDetails:", degreeDetails)

  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find((degree) => degree._id === degreeId);
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);
  console.log('DegreeDatails:', degreeDetails)

  if (!degreeDetails) {
    return <div>Loading...</div>;
  }

  function formatDate(dateString) {
    if (!dateString) {
      return 'No date available';
    }
  
    const date = new Date(dateString);
    return date.toLocaleDateString('fi-FI'); // Adjust the locale as needed
  }
  
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
            </div>
          ))}
      </div>
      <div className='section-title'>Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box'>
          {degreeDetails.description.fi ? (degreeDetails.description.fi)
          : (<p>No description data.</p>)}
        </div>
      <div className='section-title'>Tutkintotiedot</div>
        <ul className='summary__container--box'>
          <strong>Määräyksen diaarinumero</strong>
          <li>{formatDate(degreeDetails.diaryNumber)}</li>
          <strong> Määräyksen päätöspäivämäärä</strong>
          <li>{formatDate(degreeDetails.regulationDate)}</li>
          <strong>Voimaantulo</strong>
          <li>{formatDate(degreeDetails.validFrom)}</li>
          <strong>Voimassaolon päättyminen</strong>
          <li>{formatDate(degreeDetails.expiry)}</li>
          <strong>Siirtymäajan päättymisaika</strong>
          <li>{formatDate(degreeDetails.transitionEnds)}</li>
        </ul>
        <PageNavigationButtons
          handleBackText={'Takaisin'}
          //handleBack={() =>navigate(`/degrees/${params.degreeId}/units/tasks`)}
          //handleForward={handleSubmit}
          forwardButtonText={'Muokkaa tietoja'}
          icon={'mingcute:pencil-line'}
        />
      </section>
      <UserNav />
    </main>
  );
};
 
export default CreateUnitesSummary;
 