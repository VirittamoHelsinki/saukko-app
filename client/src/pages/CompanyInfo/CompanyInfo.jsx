// Import components & libraries
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IconButton, Box, DialogContent, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Button from '../../components/Button/Button';
import PageNavigationButtons from '../../components/PageNavigationButtons/PageNavigationButtons';
import Stepper from '../../components/Stepper/Stepper';

import { fetchExternalCompanyData } from '../../api/workplace';
import useStore from '../../store/zustand/formStore';
import InternalApiContext from '../../store/context/InternalApiContext';

import { CiSearch } from 'react-icons/ci';
import { RxCrossCircled } from 'react-icons/rx';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '@iconify/react/dist/iconify.js';
import useHeadingStore from '../../store/zustand/useHeadingStore';
import NotificationModal from '../../components/NotificationModal/NotificationModal';

import AddSupervisorModal from '../../components/AddSupervisorModal/AddSupervisorModal';

const CompanyInfo = () => {
  const navigate = useNavigate();
  const {
    businessId,
    setBusinessId,
    businessIDError,
    setBusinessIdError,
    name,
    setName,
    // eslint-disable-next-line no-unused-vars
    departments,
    setDepartmentName,
    editedCompanyName,
    setEditedCompanyName,
    supervisors,
    setSupervisors,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    työpaikkaohjaajaEmail,
    setTyöpaikkaohjaajaEmail,
  } = useStore();

  const { internalDegree } = useContext(InternalApiContext);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const [openInfoButton, setOpenInfoButton] = useState(false);
  const [openAddSupervisorModal, setOpenAddSupervisorModal] = useState(false);

  const handleOpenInfoButton = () => {
    setOpenInfoButton(true);
  };

  const handleCloseInfoButton = () => {
    setOpenInfoButton(false);
  };

  const handleOpenAddSupervisorModal = () => {
    setOpenAddSupervisorModal(true);
  };

  const handleCloseAddSupervisorModal = () => {
    setOpenAddSupervisorModal(false);
  };

  useEffect(() => {
    setSiteTitle("Lisää yksikkö")
    setSubHeading("Lisää uusi yksikkö")
    setHeading("Työpaikkojen hallinta")
  }, [setSiteTitle, setSubHeading, setHeading]);

  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/company-info',
    },
    {
      label: 'Valitse tutkinto',
      url: '/internal/degrees',
    },
    {
      label: 'Valitse tutkinnonosat',
      url: `/internal/degrees/${internalDegree._id}/units`,
    },
    {
      label: 'Vahvista tiedot',
      url: `/internal/degrees/${internalDegree._id}/units/confirm-selection`,
    },
  ];

  const deleteSupervisor = (index) => {
    setSupervisors(supervisors.filter((_, i) => i !== index))
  }

  const handleForward = (e) => {
    e.preventDefault();

    // Form validation: check for empty fields
    if (
      supervisors.length === 0
    ) {
      alert('Please fill in all required fields.');
      return;
    }

    // Navigate to next page
    navigate(`../internal/degrees`);
  };

  return (
    <div className='companyInfo__wrapper'>
      <h1>Työpaikkojen hallinnointi</h1>
      <h2>Lisää uusi yksikkö</h2>

      <div className='info__stepper__container'>
        <Stepper activePage={1} totalPages={4} data={stepperData} />
      </div>


      <div className="card">
        <p>Työpaikan tiedot</p>
        <table>
          <thead>
            <tr>
              <th>Nimi</th>
              <th>Y-tunnus</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Helsingin kaupunki</td>
              <td>070-5658-9</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="card">
        <p>
          Yksikön tiedot 
          <span>
            <Icon
              icon='material-symbols:info'
              color='#0288D1'
              style={{ verticalAlign: 'text-bottom', fontSize: '21px', marginLeft: "5px" }}
              cursor={'pointer'}
              onClick={() => handleOpenInfoButton()}
            />
          </span>  
        </p>

        <div className="card__field">
          <label htmlFor='department-name-input' className=''>
            Yksikön nimi *
          </label>
          <input
            className='text_input'
            id='department-name-input'
            name='Työpaikan yksikkö'
            placeholder="Kirjoita yksikön nimi"
            required
            onChange={(event) => setName({ name: event.target.value })}
          />
        </div>

        <div className="card__field">
          <label htmlFor='department-description-input' className=''>
            Yksikön lisätiedot
          </label>
          <textarea
            className='text_input'
            id='department-description-input'
            name='Yksikön lisätiedot'
            placeholder="Mahdollisia lisätietoja yksiköstä kuten sijainti."
            rows={8}
            onChange={() => {}}
          />
        </div>
      </div>

      <div className="card">
        <p>Ohjaajien tiedot</p>

        <Button
          id='addSupervisorButton'
          text='Lisää uusi ohjaaja'
          style={{
            width: '100%',
            backgroundColor: '#0000BF',
            color: 'white',
            border: 'none',
            direction: 'rtl',

          }}
          icon={'ic:baseline-plus'}
          onClick={ handleOpenAddSupervisorModal }
        />

        {
          supervisors.map((supervisor, index) => (
            <div key={supervisor._id} className="supervisor">
              <div className="supervisor__info">
                <p className="supervisor__info-title">Ohjaaja</p>
                <p className="supervisor__info-name">{supervisor.firstName} {supervisor.lastName}</p>
                <p className="supervisor__info-email">{supervisor.email}</p>
              </div>

              <IconButton
                className="delete-button"
                style={{ backgroundColor: 'white' }}
                edge="end"
                onClick={() => deleteSupervisor(index)}
              >
                <Icon
                  icon='material-symbols:delete-outline'
                  color='#B01038'
                  preserveAspectRatio='xMinYMid meet'
                />
              </IconButton>
            </div>
          ))
        }
      </div>

      <PageNavigationButtons
        handleBack={() => navigate('/add/companyname')}
        handleForward={handleForward}
        showForwardButton={true}
        disabled={supervisors.length === 0}
      />

      <NotificationModal
        type='iconInfo'
        hideIcon={true}
        body={
          <div>
            <IconButton
              aria-label='close'
              onClick={handleCloseInfoButton}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: 'black',
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent>
              Mikäli yksiköllä on alaosasto, luo uusi yksikkötieto erottamalla alaosasto kauttaviivalla (esim. Uusix verstas / pyöräpaja)
            </DialogContent>
          </div>
        }
        open={openInfoButton}
        handleClose={handleCloseInfoButton}
      />

      <AddSupervisorModal
        isOpen={openAddSupervisorModal}
        onClose={handleCloseAddSupervisorModal}
        setSupervisors={setSupervisors}
        supervisors={supervisors}
      />
    </div>
  );
};

export default CompanyInfo;
