import React from 'react';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const PageNumbers = ({ activePage }) => {
  return (
    <div className="page-numbers__wrapper">
        <div className="page-numbers__wrapper--numbers">
            <div className={`circle ${activePage === 1 ? 'active' : 'done'}`}>
                {activePage === 1 ? 
                    <span className={`number ${activePage >= 1 ? 'active' : ''}`}>1</span> 
                    : <Icon icon="mdi:tick" color="white" />}
            </div>
            <div className={`line ${activePage >= 2 ? 'active' : ''}`} />
            <div className={`circle ${activePage === 2 ? 'active' : ''} ${activePage >= 3 ? 'done' : ''}`}>
                {activePage <= 2 ? 
                    <span className={`number ${activePage >= 2 ? 'active' : ''}`}>2</span> 
                    : <Icon icon="mdi:tick" color="white" />}
            </div>
            <div className={`line ${activePage >= 3 ? 'active' : ''}`} />
            <div className={`circle ${activePage >= 3 ? 'active' : ''}`}>
                <span className={`number ${activePage === 3 ? 'active' : ''}`}>3</span>
            </div>
        </div>
        <div>
            <div className="page-numbers__wrapper--text">
                <span className={`page-text ${activePage >= 1 ? 'active' : ''}`}>Valitse tutkinto</span>
                <span className={`page-text ${activePage >= 2 ? 'active' : ''}`}>Valitse tutkinnonosat</span>
                <span className={`page-text ${activePage === 3 ? 'active' : ''}`}>Vahvista pyyntö</span>
            </div>
        </div>
    </div>
  );
};

PageNumbers.propTypes = {
    activePage: PropTypes.number.isRequired
};

export default PageNumbers;
