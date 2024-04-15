// Import react packages & dependencies
import React, { useContext, useEffect, useState } from 'react';

// Import components
import WavesHeader from '../../components/Header/WavesHeader';
import InfoList from '../../components/InfoList/InfoList';
import UserNav from '../../components/UserNav/UserNav';
import InternalApiContext from '../../store/context/InternalApiContext';
import { fetchInternalDegreeById } from '../../api/degree';
import { all } from 'axios';

const ContractInfo = () => {
  const { evaluation } = useContext(InternalApiContext);
  console.log("🚀 ~ ContractInfo ~ evaluation:", evaluation)
  const [degreeDetails, setDegreeDetails] = useState(null);

  useEffect(() => {
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
  }, [evaluation]);

  function formatDate(dateString) {
    const startDate = new Date(dateString);
    const day = startDate.getDate().toString().padStart(2, '0'); // Get day with leading zero if necessary
    const month = (startDate.getMonth() + 1).toString().padStart(2, '0'); // Get month with leading zero if necessary (Note: January is 0)
    const year = startDate.getFullYear();
    return `${day}.${month}.${year}`;
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
      title: 'Asiakkuuden lopeutuspäivä',
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
      content: supervisorEmails
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
          ? formatDate(degreeDetails.regulationDate)
          : '-',
    },
    {
      title: 'Voimaantulo',
      content:
        degreeDetails && degreeDetails.validFrom
          ? formatDate(degreeDetails.validFrom)
          : '-',
    },
    {
      title: 'Voimassaolo päätyminen',
      content:
        degreeDetails && degreeDetails.expiry
          ? formatDate(degreeDetails.expiry)
          : '-',
    },
    {
      title: 'Siirtymäajan päättymisaika',
      content:
        degreeDetails && degreeDetails.transitionEnds
          ? formatDate(degreeDetails.transitionEnds)
          : '-',
    },
    {
      title: 'Työtehtävä',
      content: evaluation?.workTasks,
    },
    {
      title: 'Omat tavoitteet',
      content: evaluation?.workGoals,
    }
  ];
  return (
    <main className='contractInfo__wrapper'>
      <WavesHeader
        title='Sopimus'
        secondTitle={
          evaluation?.customerId?.firstName +
          ' ' +
          evaluation?.customerId?.lastName
        }
        disabled={true}
      />
      <div className='contractInfo__container'>
        <section className='contractInfo__container--description'>
          <InfoList data={data} />
        </section>
        <section className='contractInfo__container--description'>
          <ul>
            {evaluation &&
              evaluation.units.map((unit, index) => (
                <li key={index}>
                  <h4>{unit.name.fi}</h4>
                  {unit &&
                    unit.assessments.map((assessment, index) => (
                      <div key={index}>
                        <h5>{assessment.name.fi}</h5>
                      </div>
                    ))}
                </li>
              ))}
          </ul>
          {/* <h3>Tutkinnon suorittaneen osaaminen</h3>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima
            adipisci delectus soluta velit ducimus qui nihil nam reprehenderit.
            Libero nam reprehenderit dolorem officia reiciendis aperiam,
            accusamus possimus doloribus? Voluptate, porro? Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Nemo vel saepe odio
            recusandae tempore soluta voluptatibus iste excepturi laboriosam,
            commodi, fugit doloribus atque sed ipsum quaerat enim et quibusdam
            tenetur.
          </p>
          <Hyperlink
            linkText={'Lue lisää tästä linkistä'}
            linkSource={
              'https://eperusteet.opintopolku.fi/#/fi/ammatillinenperustutkinto/3397336/tiedot'
            }
          /> */}
        </section>
      </div>
      <UserNav />
    </main>
  );
};

export default ContractInfo;
