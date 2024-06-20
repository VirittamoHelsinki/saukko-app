// Import react packages & dependencies
import { useContext, useEffect, useState } from 'react';
import { useEvaluations } from '../../store/context/EvaluationsContext.jsx';
// Import components
import InternalApiContext from '../../store/context/InternalApiContext';
import { fetchInternalDegreeById } from '../../api/degree';
import { useHeadingContext } from '../../store/context/headingContectProvider';
import InfoList from '../../components/InfoList/InfoList';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';


import { useNavigate, useParams } from 'react-router-dom';

const ContractInfo = () => {
  /* const { evaluation } = useContext(InternalApiContext); */
  const navigate = useNavigate();
  const [degreeDetails, setDegreeDetails] = useState(null);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingContext();
  const { customerId } = useParams();

  const { isLoading, evaluations, evaluation } = useEvaluations();

  useEffect(() => {

    console.log('evaluation zxzxzx: ', evaluation)
    console.log('evaluations: ', evaluations)
  }, [isLoading])

  useEffect(() => {

    if (!isLoading && !evaluation) {
      const ev = evaluations.find((ev) => ev.customerId._id === customerId)
      if (ev) {
        console.log('ev: ')
      } else {
        console.log('evaluation not found')
      }
    }
  }, [])

  useEffect(() => {
    setSiteTitle("Sopimus"), setSubHeading(evaluation?.customerId?.firstName + ' ' + evaluation?.customerId?.lastName), setHeading("Sopimus")
    const degree = async () => {
      try {
        const response = await fetchInternalDegreeById(evaluation?.degreeId);
        console.log('Degree details: ', response);
        setDegreeDetails(response);
      } catch (error) {
        console.error(error);
        throw error; // Throw the error for the caller to handle
      }
    };

    degree();
  }, [evaluation, setHeading, setSiteTitle, setSubHeading]);

  function formatDate(dateString) {
    const startDate = new Date(dateString);
    const day = startDate.getDate().toString().padStart(2, '0'); // Get day with leading zero if necessary
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero if necessary (Note: January is 0)
    const year = startDate.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function formatDateWithStringMonth(dateString) {
    const months = ['tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta'];
    const startDate = new Date(dateString);
    const day = startDate.getDate().toString().padStart(2, '0'); // Get day with leading zero if necessary
    const monthIndex = startDate.getMonth();
    const monthName = months[monthIndex];
    const year = startDate.getFullYear();
    return `${day}.${monthName} ${year}`;
  }

  const startDateString = evaluation?.startDate; // Get start date from evaluation object
  const endDateString = evaluation?.endDate; // Get end date from evaluation object

  let supervisorNames;
  if (evaluation?.supervisorIds && evaluation.supervisorIds.length > 0) {
    supervisorNames = ''; // Reset the default message
    evaluation.supervisorIds.forEach((supervisor) => {
      const firstName = supervisor.firstName || '';
      const lastName = supervisor.lastName || '';
      supervisorNames += `${firstName} ${lastName}, `;
    });
    supervisorNames = supervisorNames.slice(0, -2);
  }

  let supervisorEmails;
  if (evaluation?.supervisorIds && evaluation.supervisorIds.length > 0) {
    supervisorEmails = ''; // Reset the default message
    evaluation.supervisorIds.forEach((supervisor) => {
      const email = supervisor.email || '';
      supervisorEmails += `${email}, `;
    });
    supervisorEmails = supervisorEmails.slice(0, -2);
  }

  const data = [
    {
      title: 'Nimi',
      content: `${evaluation?.customerId?.firstName} ${evaluation?.customerId?.lastName}`,
    },
    {
      title: 'Sähköposti',
      content: evaluation && evaluation?.customerId?.email,
    },
    {
      title: 'Asiakkuuden aloituspäivä',
      content: formatDate(startDateString),
    },
    {
      title: 'Asiakkuuden lopetuspäivä',
      content: formatDate(endDateString),
    },
    {
      title: 'Työpaikka',
      content: evaluation?.workplaceId?.name,
    },
    {
      title: 'Y-tunnus',
      content: evaluation?.workplaceId?.businessId,
    },
    {
      title: 'Yksikkö',
      content: evaluation?.workplaceId?.departmentId?.name || '-',
    },
    {
      title: 'Työpaikkaohjaaja',
      content: supervisorNames,
    },
    {
      title: 'TPO:n sähköposti',
      content: supervisorEmails,
    },
    {
      title: 'Tutkinnon nimi',
      content: degreeDetails && degreeDetails?.name.fi,
    },
    {
      title: 'Määräyksen diaarinumero',
      content: degreeDetails && degreeDetails?.diaryNumber,
    },
    {
      title: 'Määräyksen päättöspäivämäärä',
      content:
        degreeDetails && degreeDetails.regulationDate
          ? formatDateWithStringMonth(degreeDetails.regulationDate)
          : '-',
    },
    {
      title: 'Voimaantulo',
      content:
        degreeDetails && degreeDetails.validFrom
          ? formatDateWithStringMonth(degreeDetails.validFrom)
          : '-',
    },
    {
      title: 'Voimassaolon päätyminen',
      content:
        degreeDetails && degreeDetails.expiry
          ? formatDateWithStringMonth(degreeDetails.expiry)
          : '-',
    },
    {
      title: 'Siirtymäajan päättymisaika',
      content:
        degreeDetails && degreeDetails.transitionEnds
          ? formatDateWithStringMonth(degreeDetails.transitionEnds)
          : '-',
    },
    {
      title: 'Työtehtävä',
      content: evaluation?.workTasks,
    },
    {
      title: 'Omat tavoitteet',
      content: evaluation?.workGoals,
    },
  ];

  return (
    <div className='contractInfo__wrapper'>
      <div className='contractInfo__container'>
        <section className='contractInfo__container--description'>
          <InfoList data={data} />
        </section>
        <section
          className='contractInfo__container--description'
          style={{
            marginTop: '4rem',
            backgroundColor: '#f2f2f2',
            padding: '1rem 3.5rem',
          }}
        >
          <ul>
            {evaluation &&
              evaluation?.units?.map((unit, index) => (
                <li key={index}>
                  <h4 style={{ margin: '6px 0' }}>{unit.name.fi}</h4>
                  {unit &&
                    unit?.assessments?.map((assessment, innerIndex) => (
                      <ul key={innerIndex}>
                        <li style={{ padding: '2px' }}>
                          {innerIndex + 1}. {assessment?.name?.fi}
                        </li>
                      </ul>
                    ))}
                  {index !== evaluation?.units?.length - 1 && (
                    <hr style={{ margin: '12px 0' }} />
                  )}
                </li>
              ))}
          </ul>
        </section>
      </div>
      <PageNavigationButtons
        handleBackText={'Takaisin'}
        //handleBack={() => navigate(`/degrees/add`)}
        handleBack={() => {
          setSubHeading('')
          navigate('/')
        }}
        showForwardButton={false}
        icon={'mingcute:pencil-line'}
        style={{ textAlign: 'left' }}
      />
    </div>
  );
};

export default ContractInfo;
