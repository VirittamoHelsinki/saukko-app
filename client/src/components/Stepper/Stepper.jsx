/* 
  EXAMPLE USAGE

  // Define labels and urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form'
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace'
    },
  ];

  // Pass labels and urls array, number of total pages, and current page
  <Stepper
    activePage={1}
    totalPages={4}
    data={stepperData}
  />
*/

import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Stepper = ({ activePage, totalPages, data }) => {
  const navigate = useNavigate();

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
            <Icon icon="zondicons:checkmark" color="white"/>
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
          {data.map((step, index) => (
            <span
              key={index}
              className={`page-text ${activePage >= index + 1 ? 'active' : ''}`}
              onClick={() => navigate(step.url)}
            >
              {step.label}
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
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stepper;
