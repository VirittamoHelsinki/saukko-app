// Import React
import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import Button from '../../../components/Button/Button';

// Import state management
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

const UnitList = () => {
  const navigate = useNavigate();
  // Data from store management
  const { currentUser } = useAuthContext();
  const {
    evaluation,
    evaluations,
    setInternalEvaluations,
    setInternalEvaluation,
    allInternalDegrees,
  } = useContext(InternalApiContext);

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();

  const degreeName =
    allInternalDegrees &&
    allInternalDegrees.find((degree) => degree._id === evaluation?.degreeId);
  // console.log('🚀 ~ UserPerformance ~degree name:', degreeName);

  // Set evaluation automatically when role is customer
  useEffect(() => {
    setSiteTitle('Suoritukset'), setSubHeading('Suoritukset');
    if (currentUser.role === 'teacher' || currentUser.role === 'supervisor') {
      setHeading(
        `${evaluation?.customerId.firstName} ${evaluation?.customerId.lastName}`
      );
    } else {
      setHeading(`Tervetuloa, ${evaluation?.customerId.firstName} `);
    }
    if (currentUser.role === 'customer') {
      setInternalEvaluations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (
      currentUser.role === 'customer' &&
      evaluations &&
      evaluations.length > 0
    ) {
      setInternalEvaluation(evaluations[0]._id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [evaluations]);

  return (
    <div className='unitList__wrapper'>
      <div className='unitList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div className='unitList__units'>
        {currentUser.role === 'customer' ? (
          <>
            <h3>Tutkinnon nimi</h3>
            <h3> Omat suoritukset </h3>
          </>
        ) : (
          <h3> Asiakkaan suoritukset </h3>
        )}

        {evaluation &&
          evaluation.units.map((unit) => (
            <div style={{ cursor: 'pointer' }} key={unit._id}>
              <UnitStatus
                key={unit._id}
                unitId={unit._id}
                status={unit.status}
                subheader={unit.name.fi}
                link='/userperformance'
              />
            </div>
          ))}
        <div className='unitList__button' style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {currentUser?.role !== 'customer' && (
            <Button
              text='Takaisin'
              icon='bx:arrow-back'
              onClick={() => navigate('/')} 
              className='unitList__button--back'
            />
          )}
          <Button
            className='unitList__button--sopimus'
            text='Tarkastele sopimusta'
            color='info'
            icon='bx:file'
            onClick={() => navigate('/contract-info')}
          />
        </div>
        <div className='wrapper-button-pdf'>
          {currentUser?.role === 'teacher' && (
            <Button
              text='Tee PDF-yhteenveto osaamisesta'
              className='button--pdf'
              icon='bx:file'
            />
          )}{' '}
        </div>
      </div>
    </div>
  );
};

export default UnitList;
