import greenicone from '../../assets/circle-green.jpg';
import redicone from '../../assets/circle-red.jpg';
import yellowicone from '../../assets/circle-yellow.jpg';
import blueicone from '../../assets/circle-blue.jpg';
import blackicone from '../../assets/circle-black.jpg';
import right from '../../assets/angle-right.jpg';

import React from 'react';
import { Link } from 'react-router-dom';

const UnitStatus = ({ status, subheader, link }) => {
  let header, backgroundColor, img;

  if (status === 1) {
    img = <img src={greenicone} alt="" />;
    header = 'Hyväksytty';
    backgroundColor = '#E2F5F3';
  } else if (status === 2) {
    img = <img src={yellowicone} alt="" />;
    header = 'Käsittelyssä';
    backgroundColor = '#FFF4B4';
  } else if (status === 3) {
    img = <img src={redicone} alt="" />;
    header = 'Täydennettävä';
    backgroundColor = '#F6E2E6';
  } else if (status === 4) {
    img = <img src={blueicone} alt="" />;
    header = 'Aloitettu';
    backgroundColor = '#E5EFF8';
  } else if (status === 5) {
    img = <img src={blackicone} alt="" />;
    header = 'Aloittamatta';
    backgroundColor = '#efeff0';
  }

  return (
    <div style={{ backgroundColor }}>
      <div>
        <Link to={link}>
          <div>{img}</div>
        </Link>
        <h1>{header}</h1>
      </div>
      {subheader && <h2>{subheader}</h2>}
    </div>
  );
};

export default UnitStatus;




