import { useNavigate } from 'react-router-dom';
import evaluationStore from '../../store/zustand/evaluationStore';
import greenicone from '../../assets/circle-green.svg';
import yellowicone from '../../assets/circle-yellow.svg';
import blueicone from '../../assets/circle-blue.svg';
import blackicone from '../../assets/circle-black.svg';
import rightAngle from '../../assets/angle-right.svg';

const UnitStatus = ({ unitId, status, subheader, link }) => {
  const navigate = useNavigate();
  const { setChosenUnitId } = evaluationStore();
  let header, backgroundColor, img;

  if (status === 3) {
    img = <img src={greenicone} alt='Icone' />;
    header = 'Valmis';
    backgroundColor = '#E2F5F3';
  } else if (status === 2) {
    img = <img src={yellowicone} alt='Icone' />;
    header = 'Käsittelyssä';
    backgroundColor = '#FFF4B4';
  } else if (status === 1) {
    img = <img src={blueicone} alt='Icone' />;
    header = 'Aloitettu';
    backgroundColor = '#E5EFF8';
  } else if (status === 0) {
    img = <img src={blackicone} alt='Icone' />;
    header = 'Aloittamatta';
    backgroundColor = '#efeff0';
  }

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
