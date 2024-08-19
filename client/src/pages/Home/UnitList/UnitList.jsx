import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

// Import components
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UnitStatus from '../../../components/UnitStatus/UnitStatus';
import Button from '../../../components/Button/Button';
import useEvaluationStore from '../../../store/zustand/evaluationStore.js';

// Import state management
import { useAuthContext } from '../../../store/context/authContextProvider';

// Import PDF Certificate Export
import PdfExportButton from '../../../components/PdfCertificate/PdfExportButton.jsx';
import useHeadingStore from '../../../store/zustand/useHeadingStore.js';

const UnitList = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const { customerId } = useParams();

  const { data: evaluations, isLoading } = useQuery({
    queryKey: ['evaluations'],
    queryFn: () => fetchAllEvaluations()
  });

  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { evaluation, setEvaluation } = useEvaluationStore();

  useEffect(() => {
    if (evaluation && currentUser) {
      const customer = evaluation.customerId;
      if (currentUser.role === 'customer') {
        setHeading(`Tervetuloa, ${customer.firstName}`);
      } else {
        setHeading(`${customer.firstName} ${customer.lastName}`);
      }
    }
  }, [evaluation, currentUser, setHeading]);

  useEffect(() => {
    setSiteTitle('Suoritukset');
    setSubHeading('Suoritukset');

    if (!isLoading && !evaluation) {
      const ev = evaluations.find((ev) => ev.customerId._id === customerId);

      if (ev) {
        console.log('setting evaluation in userlist');
        setEvaluation(ev);
      } else {
        console.log('evaluation not found');
      }
    }
  }, [
    customerId,
    evaluation,
    evaluations,
    isLoading,
    setEvaluation,
    setSiteTitle,
    setSubHeading,
  ]);

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
        {console.log('evaluation: ', evaluation)}
        {evaluation &&
          evaluation.units &&
          evaluation.units.map((unit) => (
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
        <div
          className='unitList__button'
          style={{ display: 'flex', justifyContent: 'flex-end' }}
        >
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
            onClick={() =>
              navigate(`/contract-info/${evaluation.customerId._id}`)
            }
          />
        </div>
        {
          currentUser?.role === 'teacher' && evaluation && (
            <div className='wrapper-button-pdf'>
              <PdfExportButton data={evaluation} />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default UnitList;
