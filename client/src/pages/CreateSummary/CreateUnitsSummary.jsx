import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import WavesHeader from '../../components/Header/WavesHeader';
import UserNav from '../../components/UserNav/UserNav';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import { Icon } from '@iconify/react';
import RequirementsAndCriteriaModal from '../../components/RequirementsAndCriteriaModal/RequirementsAndCriteriaModal';

const CreateUnitesSummary = ({ allInternalDegrees }) => {
  const navigate = useNavigate();
  const params = useParams();
  console.log('🚀 ~ DegreeDetail ~ allInternalDegrees:', allInternalDegrees);
  const { degreeId } = useParams();
  console.log('🚀 ~ DegreeDetail ~ degreeId:', degreeId);
  const [degreeDetails, setDegreeDetails] = useState(null);
  console.log('🚀 ~ DegreeDetail ~ degreeDetails:', degreeDetails);

  // Modal
  const [isCriteriaModalOpen, setIsCriteriaModalOpen] = useState(false);

  const handleCloseCriteriaModal = () => {
    setIsCriteriaModalOpen(false);
  };
  const handlePenClick = () => {
    setIsCriteriaModalOpen(true);
  };

  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find(
      (degree) => degree._id === degreeId
    );
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);
  console.log('DegreeDatails:', degreeDetails);

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
        <div className='degree-summary'>
          <h1 className='degree-title '>
            {degreeDetails.name?.fi}{' '}
            <span className='icon-wrapper'>
              {' '}
              <div>
                <Icon icon='uil:pen' color='#0000bf' onClick={handlePenClick} />
              </div>
            </span>
          </h1>
        </div>
        <div className='section-title'>Tutkinnonosat ja tehtävät</div>
        <div className='summary__container--box'>
          {/* Display other degree details as needed */}
          {degreeDetails.units.map((unit, index) => (
            <div key={index} className='unit-container'>
              <div className='unit-name-icons-container'>
                <strong className='unit-title'>{unit.name.fi}</strong>
                <div className='circle-wrap-icon'>
                  <Icon
                    icon='material-symbols:delete-outline'
                    color='A0A0A0'
                    height='18'
                    preserveAspectRatio='xMinYMid meet'
                  />
                </div>
                <div className='circle-wrap-icon'>
                  <span>
                    <Icon
                      onClick={handlePenClick}
                      icon='uil:pen'
                      color='#0000bf'
                      height='18'
                      preserveAspectRatio='xMinYMid meet'
                    />
                  </span>
                </div>
              </div>
              {unit.assessments &&
                unit.assessments.map((assessment, assessmentIndex) => (
                  <p key={assessmentIndex}>
                    {assessmentIndex + 1}. {assessment.name?.fi}
                  </p>
                ))}
            </div>
          ))}
        </div>
        <div className='section-title'>Tutkinnon suorittaneen osaaminen</div>
        <div className='summary__container--box unit-description'>
          <div className='description-content'>
            {degreeDetails.description.fi ? (
              degreeDetails.description.fi
            ) : (
              <p>No description data.</p>
            )}
          </div>
          <div>
            <div className='circle-wrap-icon'>
              <Icon
                onClick={handlePenClick}
                icon='uil:pen'
                color='#0000bf'
                height='18'
                preserveAspectRatio='xMinYMid meet'
              />
            </div>
          </div>
        </div>
        <div className='section-title'>Tutkintotiedot</div>
        <ul className='summary__container--box'>
          <div className='unit-name-icons-container'>
            <strong className='unit-title'>Määräyksen diaarinumero</strong>{' '}
            <div>
              <div className='circle-wrap-icon'>
                <Icon
                  onClick={handlePenClick}
                  icon='uil:pen'
                  color='#0000bf'
                  height='18'
                  preserveAspectRatio='xMinYMid meet'
                />
              </div>
            </div>
          </div>
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
        <RequirementsAndCriteriaModal
          open={isCriteriaModalOpen}
          onClose={handleCloseCriteriaModal}
          title='Tutkinnon nimen muokkaus'
          requirementsTitle='Tutkinnon nimi'
          hideCriteriaField={true}
          onSave={(title) => {
            console.log('Title:', title);
          }
          }
        />
        <div className='page-navigation-container'>
          <PageNavigationButtons
            handleBackText={'Takaisin'}
            handleBack={() => navigate(`/degrees/add`)}
            showForwardButton={false}
            icon={'mingcute:pencil-line'}
            style={{ justifyContent: 'flex-start' }}
          />
        </div>
      </section>
      <UserNav />
    </main>
  );
};

export default CreateUnitesSummary;
