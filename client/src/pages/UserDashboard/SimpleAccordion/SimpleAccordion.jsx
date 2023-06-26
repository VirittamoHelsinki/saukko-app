// import * as React from 'react';
// import Accordion from '@mui/material/Accordion';
// import AccordionSummary from '@mui/material/AccordionSummary';
// import AccordionDetails from '@mui/material/AccordionDetails';
// import Typography from '@mui/material/Typography';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#FFF4B4', height: '40px' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Kesken</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>

          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#efeff0' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography style={{ color: '#fffff' }}>Aloittamatta</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: '#E2F5F3' }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography style={{ color: '#FFFFFF' }}>Suorittanut</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ display: 'flex', flexDirection: 'column' }}>
            <a href="">Alex Tenorio</a>
            <a href="">Oea Romana</a>
            <a href="">Emiliya Pere</a>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}


