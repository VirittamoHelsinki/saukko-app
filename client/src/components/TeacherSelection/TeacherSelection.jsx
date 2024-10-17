import { useState, useEffect } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Icon } from '@iconify/react';
import { fetchAllTeachers } from '../../api/user'; // Adjust import path as needed
import useEvaluationFormStore from '../../store/zustand/evaluationFormStore';

const TeacherSelection = ({ workplace, adminsOnly = true }) => {

  const [fetchedTeachers, setFetchedTeachers] = useState([]);

  const { setSelectedTeacher, selectedTeacher, setEvaluation } = useEvaluationFormStore();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await fetchAllTeachers();

        const workplaceDegreeId = workplace && workplace.degreeId;

        const adminTeachers = workplace ?
          response.data.filter((user) =>
            (adminsOnly && user.permissions === 'admin') && user.degrees.some(degree => degree === workplaceDegreeId)
          ) : [];

        setFetchedTeachers(adminTeachers); // Assuming response.data contains the array of teachers
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachers();
  }, [workplace, adminsOnly]);

  // Handle selecting a teacher from the dropdown
  const handleTeacherChange = (teacherId) => {
    // Find the teacher object from the fetchedTeachers array
    const selectedTeacher = fetchedTeachers.find(
      (teacher) => teacher._id === teacherId);

    // If found, pass the teacher ID to the parent component
    if (selectedTeacher) {
      setSelectedTeacher(selectedTeacher)

      setEvaluation((prevState) => ({
        ...prevState,
        teacherId: teacherId,
      }));
    }

  };

  return (
    <>
      <Typography className='accordion-title'>Valitse opettaja *</Typography>
      <Accordion disableGutters square className='accordion__wrapper'>
        <AccordionSummary sx={{ position: 'static' }} expandIcon={<ExpandMoreIcon />}>
          Valitse
        </AccordionSummary>
        <AccordionDetails>
          {fetchedTeachers.map((teacher) =>
          (
            <div
              className={`accordion__wrapper-details ${selectedTeacher && selectedTeacher._id === teacher._id ? 'selected' : ''
                }`}
              key={teacher._id}
              onClick={() => handleTeacherChange(teacher._id)}
            >
              <Typography>{teacher.firstName} {teacher.lastName}</Typography>
              {selectedTeacher && selectedTeacher._id === teacher._id && (
                <Icon icon='mdi:tick' />
              )}
            </div>
          )
          )}
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default TeacherSelection;
