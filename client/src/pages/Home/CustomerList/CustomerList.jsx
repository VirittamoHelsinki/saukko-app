// Import React
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import NotificationBadge from '../../../components/NotificationBadge/NotificationBadge';
import UserNav from '../../../components/UserNav/UserNav';

// Import state management
import formStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';
import InternalApiContext from '../../../store/context/InternalApiContext';

// Import MUI
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function CustomerList() {
  const navigate = useNavigate();

  // Data from store management
  const { user } = useContext(AuthContext);
  const { evaluations } = useContext(InternalApiContext);
  console.log('Current users evaluations', evaluations)
  const { setChosenCustomerId } = formStore();

  // Mock data
  const customersInProgress = [
    {
      _id: 1,
      firstName: "John",
      lastName: "Doe",
    },
    {
      _id: 2,
      firstName: "Jane",
      lastName: "Smith",
    },
    {
      _id: 3,
      firstName: "Alice",
      lastName: "Johnson",
    },
    {
      _id: 4,
      firstName: "Bob",
      lastName: "Williams",
    },
    {
      _id: 5,
      firstName: "Ella",
      lastName: "Brown",
    },
  ]

  const customersNotStarted = [
    {
      _id: 6,
      firstName: "Emily",
      lastName: "Johnson",
    },
    {
      _id: 7,
      firstName: "Liam",
      lastName: "Smith",
    },
    {
      _id: 8,
      firstName: "Sophia",
      lastName: "Martinez",
    },
    {
      _id: 9,
      firstName: "Noah",
      lastName: "Davis",
    },
    {
      _id: 10,
      firstName: "Olivia",
      lastName: "Brown",
    },
  ]

  const customersCompleted = [
    {
      _id: 11,
      firstName: "Ava",
      lastName: "Wilson",
    },
    {
      _id: 12,
      firstName: "Mason",
      lastName: "Anderson",
    },
    {
      _id: 13,
      firstName: "Isabella",
      lastName: "Thompson",
    },
    {
      _id: 14,
      firstName: "Ethan",
      lastName: "Parker",
    },
    {
      _id: 15,
      firstName: "Mia",
      lastName: "White",
    }
  ]

  const handleChooseCustomer = (customerId) => {
    setChosenCustomerId(customerId)
    console.log('customer id', customerId)
    navigate('/unit-list')
  };

  return (
    <main className='customerList__wrapper'>
      <WavesHeader
        title="Saukko"
        secondTitle={`Tervetuloa, ${user?.firstName}`}
        disabled={true}
      />

      {/* Notifications */}
      <div className='customerList__notifications'>
        <h3> Ilmoitukset </h3>
        <NotificationBadge number1={10} number2={5} />
      </div>

      <div className='customerList__container'>
        <h3> Omat suoritukset </h3>

        {/* In progress */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#FFF4B4' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography sx={{ fontWeight: '600' }}>Kesken</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {customersInProgress.map((customer, index) => (
                <a key={index} onClick={() => handleChooseCustomer(customer._id)}>{customer.firstName} {customer.lastName}</a>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Not started */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#efeff0' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography sx={{ fontWeight: '600' }} >Aloittamatta</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {customersNotStarted.map((customer, index) => (
                <a key={index} onClick={() => handleChooseCustomer(customer._id)}>{customer.firstName} {customer.lastName}</a>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>

        {/* Completed */}
        <Accordion disableGutters>
          <AccordionSummary
            sx={{ backgroundColor: '#E2F5F3' }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography sx={{ fontWeight: '600' }}>Suorittanut</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className='customerList__accordion'>
              {customersCompleted.map((customer, index) => (
                <a key={index} onClick={() => handleChooseCustomer(customer._id)}>{customer.firstName} {customer.lastName}</a>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <UserNav />
    </main>
  );
}
