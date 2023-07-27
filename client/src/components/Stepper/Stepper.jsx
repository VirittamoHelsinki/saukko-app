import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import checkboxMarkedCircleOutline from '@iconify/icons-mdi/checkbox-marked-circle-outline';
import PropTypes from 'prop-types';
import DegreeContext from '../../utils/context/DegreeContext';

const Stepper = ({ activePage, totalPages, label, url }) => {
  const navigate = useNavigate();

  // Get degree from DegreeContext
  const { degree } = useContext(DegreeContext);

  const createSteppers = () => {
    const steppers = [];

    for (let page = 1; page <= totalPages; page++) {
      const isActive = activePage === page;
      const isDone = activePage > page;

      steppers.push(
        <div
          key={page}
          className={`circle ${isActive ? 'active' : isDone ? 'done' : ''}`}
        >
          {isDone ? (
            <Icon icon={checkboxMarkedCircleOutline} color='white' />
          ) : (
            <span className={`number ${isActive ? 'active' : ''}`}>{page}</span>
          )}
        </div>
      );

      if (page !== totalPages) {
        steppers.push(
          <div
            key={`line-${page}`}
            className={`line ${activePage >= page + 1 ? 'active' : ''}`}
          />
        );
      }
    }

    return steppers;
  };

  return (
    <div className='stepper__wrapper'>
      <div className='stepper__wrapper--numbers'>{createSteppers()}</div>
      <div>
        <div className='stepper__wrapper--text'>
          {label.map((text, index) => (
            <span
              key={index}
              className={`page-text ${activePage >= index + 1 ? 'active' : ''}`}
              onClick={() => navigate(url)}
            >
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

Stepper.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  label: PropTypes.arrayOf(PropTypes.string).isRequired,
  url: PropTypes.string.isRequired,
};

export default Stepper;
