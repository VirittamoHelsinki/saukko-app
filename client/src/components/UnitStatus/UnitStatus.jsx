import { useNavigate } from 'react-router-dom';
import evaluationStore from '../../store/zustand/evaluationStore';
// import greenicone from '../../assets/circle-green.svg';
// import yellowicone from '../../assets/circle-yellow.svg';
// import blueicone from '../../assets/circle-blue.svg';
// import blackicone from '../../assets/circle-black.svg';
import rightAngle from '../../assets/angle-right.svg';

const UnitStatus = ({ unitId, unit, subheader, assessment, currentUser, link }) => {
  const navigate = useNavigate();
  const { setChosenUnitId } = evaluationStore();
  let header, backgroundColor, img;

  if (unit.teacherReady) {
    header = 'Valmis';
    backgroundColor = '#B0EDD4';
  } else if (currentUser.role === 'customer') {
    if (unit.customerReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFE28C';
    } else if (!unit.customerReady && unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFAAAA';
    } else if (assessment.answer === 0) {
      header = 'Aloittamatta';
      backgroundColor = '#E2E2E2';
    } else if (assessment.answer === 1 || assessment.answer === 2) {
      header = 'Aloitettu';
      backgroundColor = '#B7D9F7';
    }

  } else if (currentUser.role === 'supervisor') {
    if (unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFE28C';
    } else if (unit.cus - omerReady && !unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFAAAA';
    } else if (assessment.answerSupervisor === 0) {
      header = 'Aloittamatta';
      backgroundColor = '#E2E2E2';
    } else if (assessment.answerSupervisor === 1 || assessment.answerSupervisor === 2) {
      header = 'Aloitettu';
      backgroundColor = '#B7D9F7';
    }

  } else if (currentUser.role === 'teacher') {
    if (unit.customerReady && !unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFAAAA';
    } else if (!unit.customerReady && unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFAAAA';
    } else if (unit.supervisorReady && unit.supervisorReady) {
      header = 'Käsittelyssä';
      backgroundColor = '#FFE28C';
    } else if (assessment.answerTeacher === 1 || assessment.answerTeacher === 2 || assessment.answer === 1 || assessment.answer === 2) {
      header = 'Aloitettu';
      backgroundColor = '#B7D9F7';
    } else if (assessment.answerTeacher === 0) {
      header = 'Aloittamatta';
      backgroundColor = '#E2E2E2';
    }

  }


  //if (status === 3) {
  //  // img = <img src={greenicone} alt='Icone' />;
  //  header = 'Valmis';
  //  backgroundColor = '#B0EDD4';
  //} else if (status === 2) {
  //  // img = <img src={yellowicone} alt='Icone' />;
  //  header = 'Käsittelyssä';
  //  backgroundColor = '#FFE28C';
  //} else if (status === 1) {
  //  // img = <img src={blueicone} alt='Icone' />;
  //  header = 'Aloitettu';
  //  backgroundColor = '#B7D9F7';
  //} else if (status === 0) {
  //  // img = <img src={blackicone} alt='Icone' />;
  //  header = 'Aloittamatta';
  //  backgroundColor = '#E2E2E2';
  //} else if (status === 4) {
  //  header = 'Käsittelyssä';
  //  backgroundColor = '#FFAAAA';
  //}

  const handleClick = () => {
    setChosenUnitId(unitId)
    navigate(link)
  }

  return (
    <div
      className='unitstatus-wrapper'
      style={{ backgroundColor }}
      onClick={handleClick}
    >
      <div className='unitstatus'>
        <div className='icone-img-style'>{img}</div>
        <h1>{header}</h1>
        <img className='icone-img-style' src={rightAngle} alt='Angle Icone' />
      </div>
      {subheader && <h2>{subheader}</h2>}
    </div>
  );
};

export default UnitStatus;
