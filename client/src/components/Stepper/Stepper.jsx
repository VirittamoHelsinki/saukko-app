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

import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';

const Stepper = ({ activePage, totalPages, data }) => {
  return (
    <div className="steps" style={{ gridTemplateColumns: `repeat(${totalPages}, 1fr)` }}>

      {
        data.map(({label}, page) => {
          page = page + 1
          const isActive = activePage === page;
          const isDone = activePage > page;

          const circleClassName = [
            "circle",
            (isActive ? "active" : ""),
            (isDone ? "done" : ""),
          ].join(" ")

          console.log(page, isActive, isDone, circleClassName);

          return (
            <div className="step-container">
              <div className={`circle ${ circleClassName }`}>
                {
                  isDone
                  ? <Icon icon="zondicons:checkmark" color="white"/>
                  : <span className={`number ${isActive ? 'active' : ''}`}>{page}</span>
                }
              </div>
              <span lang="fi">{ label }</span>
            </div>
          )
        })
      }

    </div>
  );
};

Stepper.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stepper;
