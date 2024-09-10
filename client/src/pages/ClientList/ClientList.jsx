import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHeadingStore from '../../store/zustand/useHeadingStore';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useQuery } from '@tanstack/react-query';
import { fetchAllUsers } from '../../api/user';



import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  '&::before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, .03)',

  borderBottom: "1px solid #CCC",

  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0),
  },
  ...theme.applyStyles('dark', {
    backgroundColor: 'rgba(255, 255, 255, .05)',
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
}));




const CustomerLink = ({ user }) => {
  return (
    <Link
      to="#"
      className="customer-link"
    >{ user.firstName } { user.lastName }</Link>
  )
}

function ClientList() {
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchAllUsers(),
  });


  const customers = users?.filter((user) => user.role === "customer") || []
  const activeCustomers = customers.filter((user) => user.isArchived === false)
  const archivedCustomers = customers.filter((user) => user.isArchived === true)

  useEffect(() => {
    setSiteTitle("Asiakkuudet")
    setSubHeading("")
    setHeading("Asiakkuuksien hallinnointi")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ]);


  return (
    <div className='clientList__wrapper' id='main-wrapper'>
      <section className='clientList__container'>
        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            Aktiiviset asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            <div className="clientList__list">
              {
                activeCustomers.map((user) => <CustomerLink key={user._id} user={user} />)
              }
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ backgroundColor: "#E6E6E6" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            Arkistoidut asiakkuudet
          </AccordionSummary>
          <AccordionDetails>
            <div className="clientList__list">
              {
                archivedCustomers.map((user) => <CustomerLink key={user._id} user={user} />)
              }
            </div>
          </AccordionDetails>
        </Accordion>

      </section>
    </div>
  );

}

export default ClientList;
