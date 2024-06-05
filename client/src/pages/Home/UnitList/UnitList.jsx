import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import Button from '../../../components/Button/Button';
import { useEvaluations } from '../../../store/context/EvaluationsContext.jsx';

// Import state management
import InternalApiContext from '../../../store/context/InternalApiContext';
import { useAuthContext } from '../../../store/context/authContextProvider';
import { useHeadingContext } from '../../../store/context/headingContectProvider';

const UnitList = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { customerId } = useParams();

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();
  const { evaluations, isLoading, evaluation, setEvaluation } = useEvaluations();

  useEffect(() => {

    setSiteTitle('Suoritukset');
    setSubHeading('Suoritukset');

    if (!isLoading && !evaluation) {
      const ev = evaluations.find((ev) => ev.customerId._id === customerId)
      const customer = ev.customerId
      if (ev) {
        console.log('setting evaluation in userlist')
        setEvaluation(ev)
        if (currentUser.role === 'teacher' || currentUser.role === 'supervisor') {
          setHeading(`${customer.firstName} ${customer.lastName}`);
        } else {
          setHeading(`Tervetuloa, ${customer.firstName}`);
        }
      } else {
        console.log('evaluation not found')
      }
    }
  }, [])

  return (
    <div className='unitList__wrapper'>
      <div className='unitList__notifications'>
        <h3>Ilmoitukset</h3>
        <NotificationBadge number1={10} number2={5} />
      </div>
      <div className='unitList__units'>
        {currentUser.role === 'customer' ? (
          <>
            <h3>Tutkinnon nimi</h3>
            <h3>Omat suoritukset</h3>
          </>
        ) : (
          <h3>Asiakkaan suoritukset</h3>
        )}

        {evaluation && evaluation.units && evaluation.units.map((unit) => (
          <div style={{ cursor: 'pointer' }} key={unit._id}>
            <UnitStatus
              key={unit._id}
              unitId={unit._id}
              status={unit.status}
              subheader={unit.name.fi}
              link={`/userperformance/${unit._id}`}
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
          )}
        </div>
      </div>
    </div>
  );
};

export default UnitList;
