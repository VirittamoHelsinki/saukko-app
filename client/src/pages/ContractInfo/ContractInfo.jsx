// Import react packages & dependencies
import { useEffect } from 'react';
import useEvaluationStore from '../../store/zustand/evaluationStore.js';
// Import components
import InfoList from '../../components/InfoList/InfoList';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

import useHeadingStore from '../../store/zustand/useHeadingStore.js';
import PdfExportButton from '../../components/PdfCertificate/PdfExportButton.jsx';

const ContractInfo = () => {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { evaluation } = useEvaluationStore();

  useEffect(() => {
    setSiteTitle("Sopimus")
    setSubHeading(evaluation?.customerId?.firstName + ' ' + evaluation?.customerId?.lastName)
    setHeading("Sopimus")
  }, [evaluation, setHeading, setSiteTitle, setSubHeading]);

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

  console.log("🚀 ~ ContractInfo ~ evaluation:", evaluation);
  

  const data = [
    {
      title: 'Asiakkaan nimi',
      content: `${evaluation?.customerId?.firstName} ${evaluation?.customerId?.lastName}`,
    },
    {
      title: 'Asiakkaan sähköposti',
      content: evaluation && evaluation?.customerId?.email,
    },
    {
      title: 'Sopimuksen kesto',
      content: `${formatDate(startDateString)} - ${formatDate(endDateString)}`,
    },
    {
      title: 'Opettajan nimi',
      content: evaluation?.teacherId?.firstName + ' ' + evaluation?.teacherId?.lastName,
    },
    {
      title: 'Opettajan sähköposti',
      content: evaluation?.teacherId?.email
    },
    {
      title: 'Työpaikka ja yksikkö',
      content: `${evaluation?.workplaceId?.name}, ${evaluation?.workplaceId?.departmentId?.name || '-'}`,
    },
    {
      title: 'Ohjaaja',
      content: supervisorNames,
    },
    {
      title: 'Ohjaajan sähköposti',
      content: supervisorEmails,
    },
    {
      title: "",
      content: "",
    },
    {
      title: 'Työtehtävät',
      content: evaluation?.workTasks,
    },
    {
      title: 'Omat tavoitteet',
      content: evaluation?.workGoals,
    },
    {
      title: "",
      content: "",
    },
    {
      title: 'Tutkinnon nimi',
      content: evaluation?.degreeId?.name?.fi,
    },
    {
      title: 'Tutkinnon osat',
      content: evaluation?.degreeId?.units?.map(unit => unit.name.fi).join("\n"),
    },
  ];

  return (
    <div className='contractInfo__wrapper'>
      <div className='contractInfo__container'>

        <h1
          style={{
            color: "#1A1A1A",
            fontSize: "24px",
            fontStyle: "normal",
            fontWeight: 700,
            lineHeight: "normal",
            marginBottom: "40px",
            marginLeft: "10px",
          }}
        >
          Sopimuksen yhteenveto
        </h1>

        <section className='contractInfo__container--description'>
          <InfoList data={data} />
        </section>
      </div>

      <div className="footer-buttons">
        <Link
          className="navigation-button"
          to={`/unit-list/${evaluation.customerId._id}`}
        >
          <Icon icon={"formkit:arrowleft"} />
          <p>Takaisin</p>
        </Link>

        {
          evaluation && (
            <PdfExportButton data={evaluation} label="Vie PDF-muotoon"/>
          )
        }
      </div>
    </div>
  );
};

export default ContractInfo;
