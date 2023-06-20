// Import react packages & dependencies
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Button from '../../../components/Button/Button';
import { units } from '../DegreeUnits/unitsTempData';
import useUnitsStore from '../../../unitsStore';

function ConfirmSelection() {
  const navigate = useNavigate();

  // Temp data
  const degree = {
    name: "Autoalan perustutkinto"
  }

  // Get checked units from unitsStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);

  // Pop-up confirmation
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const PopUpStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'var(--saukko-main-white)',
    boxShadow: 24,
    p: 4,
  };
  
  return (
    <main className='confirmSelection__wrapper'>
        <WavesHeader title='Saukko' secondTitle={degree.name} />
        <section className='confirmSelection__container'>
          <PageNumbers activePage={3}/>
          <h1 className='confirmSelection__container--title'>Vahvista pyyntö</h1>
          <p className='confirmSelection__container--desc'>{`Olet hakemassa ${degree.name} osien suoria näyttöjä`} </p>
          <h1 className='confirmSelection__container--secondtitle'>Valitsemasi tutkinnonosat</h1>
          <div className='confirmSelection__container--units'>
            {console.log(console.log('checked units confirm selection page: ', checkedUnits))}
            {checkedUnits?.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={units}/>
            ))}
          </div>
          <div className="confirmSelection__container--buttons">
            <div className="confirmSelection__container--buttons-back">
              <Button
                text="Takaisin"
                onClick={() => navigate('/degree-units')} // later fix to degree-units/:id
                icon={"formkit:arrowleft"}
              />
            </div>
            <div className="confirmSelection__container--buttons-forward">
              <Button
                text="Valitse tutkinnonosat"
                icon={"formkit:arrowright"}
                onClick={handleOpen}
              />
            </div>
          </div>
        </section>
        <UserNav />

        
      {/* Pop-up component */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={PopUpStyle}>
          <h3>Haluan suorittaa {degree.name} osien suoria näyttöjä</h3>
          <p id="modal-modal-description" sx={{ mt: 2 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam
          </p>
          <div className="modal__buttons">
            <div className="modal__buttons-confirm">
              <Button
                text="Vahvista"
                onClick={() => navigate('/degree-units')} // later fix to degree-units/:id
              />
            </div>
            <div className="modal__buttons-cancel">
              <Button
                text="Peruuta"
                onClick={handleOpen}
              />
            </div>
          </div>
        </Box>
      </Modal>


    </main>
  );
}

export default ConfirmSelection;
