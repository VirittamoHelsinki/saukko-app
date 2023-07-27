import greenicone from '../../assets/circle-green.svg';
import redicone from '../../assets/circle-red.svg';
import yellowicone from '../../assets/circle-yellow.svg';
import blueicone from '../../assets/circle-blue.svg';
import blackicone from '../../assets/circle-black.svg';
import rightAngle from '../../assets/angle-right.svg';

import React from 'react';
import { Link } from 'react-router-dom';

const UnitStatus = ({ status, subheader, link }) => {
  let header, backgroundColor, img;

  if (status === 1) {
    img = <img src={greenicone} alt="Icone" />;
    header = 'Hyväksytty';
    backgroundColor = '#E2F5F3';
  } else if (status === 2) {
    img = <img src={yellowicone} alt="Icone" />;
    header = 'Käsittelyssä';
    backgroundColor = '#FFF4B4';
  } else if (status === 3) {
    img = <img src={yellowicone} alt="Icone" />;
    header = 'Valmis tarkistettavaksi';
    backgroundColor = '#FFF4B4';
  }
  else if (status === 4) {
    img = <img src={redicone} alt="Icone" />;
    header = 'Täydennettävä';
    backgroundColor = '#F6E2E6';
  } else if (status === 5) {
    img = <img src={blueicone} alt="Icone" />;
    header = 'Aloitettu';
    backgroundColor = '#E5EFF8';
  } else if (status === 6) {
    img = <img src={blackicone} alt="Icone" />;
    header = 'Aloittamatta';
    backgroundColor = '#efeff0';
  }



  return (
    <main className='unitstatus-wrapper' style={{ backgroundColor }}>
      <div className='unitstatus'>
        <div className='icone-img-style'>{img}</div>
        <h1>{header}</h1>

        <Link to={link}><img className="icone-img-style" src={rightAngle} alt="Angle Icone" /></Link>

      </div>

      {subheader && <h2>{subheader}</h2>}

    </main>
  );
};



export default UnitStatus;






