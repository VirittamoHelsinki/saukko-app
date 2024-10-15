import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Checkbox, FormControlLabel, Switch } from '@mui/material';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import AddSupervisorModal from '../../../components/AddSupervisorModal/AddSupervisorModal';
import { postWorkplace } from '../../../api/workplace';
import { registration, updateUser } from '../../../api/user';
import EditSupervisorModal from '../../../components/EditSupervisorModal/EditSupervisorModal';
import PageHeader from '../../../components/PageHeader/PageHeader';
import EditCompanyNameModal from '../../../components/EditCompanyNameModal/EditCompanyNameModal';

const CompanySummary = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();
  const [workplace, setWorkplace] = useState({});
  const [degreeName, setDegreeName] = useState('');

  // Modal state
  const [isNameEditModalOpen, setIsNameEditModalOpen] = useState(false);
  const [isAddSupervisorModalOpen, setIsAddSupervisorModalOpen] = useState(false);
  const [isEditSupervisorModalOpen, setIsEditSupervisorModalOpen] = useState(false);
  const [supervisorToEdit, setSupervisorToEdit] = useState(null);

  // Workplace unit state
  const [supervisors, setSupervisors] = useState([]); // Yksikön ohjaajat
  const [assessments, setAssessments] = useState([]); // Yksikön tutkinnonosat
  const [archive, setArchive] = useState(false); // Yksikön arkistointi

  useEffect(() => {
    const fetchWorkplaces = async () => {
      try {
        const response = await axios.get(`/api/workplace/${companyId}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch workplace data', error);
      }
    };

    const fetchDegree = async (degreeId) => {
      try {
        const response = await axios.get(`/api/internal/degree/${degreeId}`);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch degree data', error);
      }
    };

    fetchWorkplaces().then((workplaceData) => {
      if (workplaceData && workplaceData.degreeId) {
        setWorkplace(workplaceData);
        setSupervisors(workplaceData.supervisors);
        setArchive(workplaceData.archived);

        console.log(workplaceData);
        

        fetchDegree(workplaceData.degreeId).then((degree) => {
          if (degree && degree.name.fi) {
            setDegreeName(degree.name.fi);
          }
        });
      }
    });
  }, [companyId]);

  const handleEditButtonClick = (supervisor) => {
    setSupervisorToEdit(supervisor);
    setIsEditSupervisorModalOpen(true);
  }

  const submitChanges = async () => {
    console.log("Submitting changes...");
    // TODO: Implement submission

    /*

      1a. Update old supervisors with potential new data
      1b. Create potential new supervisors
      2a. Update workplace with new supervisor ids
      2b. Update workplace with new name, archive status, and assessments
      2c. Save workplace
    */

    const supervisorPromises = supervisors.map(async (supervisor) => {
      console.log(supervisor);

      if (supervisor._id) {
        // Update existing supervisor

        const updatedUser = await updateUser(supervisor._id, {
          firstName: supervisor.firstName,
          lastName: supervisor.lastName,
          email: supervisor.email,
          isArchived: supervisor.isArchived || false,
        });

        return updatedUser._id
      }

      // Create new supervisor
      const newSupervisorData = {
        firstName: supervisor.firstName,
        lastName: supervisor.lastName,
        email: supervisor.email,
        password: '12341234',
        role: 'supervisor',
        workplaceId: workplace._id,
        evaluationId: null,
        isArchived: false,
      };

      // Register the supervisor and get the userId
      const userResponse = await registration(newSupervisorData);
      const userId = userResponse.data.userId;
      return userId;
    });

    //This gives an array of supervisor userIds.
    const supervisorIds = await Promise.all(supervisorPromises);

    // Update the workplace with supervisor IDs
    const updatedWorkplaceData = {
      name: workplace.name,
      supervisors: supervisorIds,
      archived: archive,
      //departments: workplace.departments, // Currently unused
      assessments: workplace.assessments,
    };

    console.log(updatedWorkplaceData);
    

    await postWorkplace({ ...workplace, ...updatedWorkplaceData });

    window.location.reload() // bandaid fix for getting latest data :o
  }

  return (
    <div className='unit-edit__wrapper'>
      <section className='unit-edit__container'>
        <PageHeader title="Työpaikkojen hallinta" subTitle="Muokkaa yksikön tietoja" />

        <div className='unit-edit__info'>
          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Työpaikka</h2>
              <p className='second__paragraph'>
                Helsingin kaupunki
              </p>
              <p className='second__paragraph'>
                070-5658-9
              </p>
            </div>

          </div>

          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Yksikkö</h2>
              <p className='second__paragraph'>
                {workplace ? workplace.name : '-'}
              </p>
            </div>

            { /* empty div to make the grid look proper */ }
            <div></div>

            <button
              className="button edit"
              onClick={() => setIsNameEditModalOpen(true)}
            >
              <Icon icon={"mingcute:pencil-line"} fontSize={20} />
            </button>
          </div>

          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Yksikön lisätiedot</h2>
              <p className='second__paragraph'>
                { workplace?.info ? workplace.info : "-"}
              </p>
            </div>
          </div>

          {supervisors.map((supervisor, index) => (
              <div key={`supervisor-${supervisor.email}`} className='unit-edit__item'>
                <div className="unit-edit__text-container">
                  <h2 className='second__title'>Ohjaaja</h2>
                  <p className='second__paragraph'>
                    { `${supervisor?.firstName} ${supervisor?.lastName} `}
                    { supervisor?.isArchived && <span style={{ color: 'red', fontSize: 14, fontStyle: "italic", }}>(Arkistoitu)</span> }
                  </p>
                  <p
                    className='second__paragraph'
                  >
                    {supervisor?.email}
                  </p>
                </div>

                { /* empty div to make the grid look proper */ }
                <div></div>

                <button className="button edit">
                  <Icon icon={"mingcute:pencil-line"} fontSize={20} onClick={() => handleEditButtonClick(supervisor)} />
                </button>
              </div>
            ))}

          <div className='unit-edit__item'>
            <button className="new-supervisor" onClick={() => setIsSupervisorModalOpen(true)}>
              + Lisää uusi ohjaaja
            </button>
          </div>

          <div className="unit-edit__item">
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Tutkinnon nimi</h2>
              <p className='second__paragraph'>{degreeName}</p>
            </div>
          </div>


          <div className='unit-edit__item'>
            <div className="unit-edit__text-container">
              <h2 className='second__title'>Tutkinnon osat</h2>
              {
                workplace.units && workplace.units.map((unit) => (
                  <p key={unit._id} className='second__paragraph'>{unit.name.fi}</p>
                ))
              }
            </div>

            { /* empty div to make the grid look proper */ }
            <div></div>

            <button className="button edit">
              <Icon icon={"mingcute:pencil-line"} fontSize={20} />
            </button>
          </div>

          <div className="archive-toggle-container">
            <FormControlLabel
              control={<Checkbox checked={archive} onChange={(event) => setArchive(event.target.checked)} color="primary" />}
              label="Arkistoi yksikkö"
            />
          </div>
        </div>

        <PageNavigationButtons
          handleBack={() => navigate(`/add/companyname/${companyId}`)}
          handleForward={submitChanges}
          forwardButtonText="Tallenna muutokset"
          showForwardButton={true}
          icon={<div></div>} // empty div to hide the icon
        />

        <EditCompanyNameModal
          isOpen={isNameEditModalOpen}
          setOpen={setIsNameEditModalOpen}
          setWorkplace={setWorkplace}
          workplace={workplace}
        />

        <AddSupervisorModal
          isOpen={isAddSupervisorModalOpen}
          onClose={() => setIsAddSupervisorModalOpen(false)}
          setSupervisors={setSupervisors}
          supervisors={supervisors}
        />

        <EditSupervisorModal
          isOpen={isEditSupervisorModalOpen}
          onClose={() => setIsEditSupervisorModalOpen(false)}
          setSupervisors={setSupervisors}
          supervisors={supervisors}
          supervisorToEdit={supervisorToEdit}
        />

      </section>
    </div>
  );
};

export default CompanySummary;
