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
  console.log(activePage, totalPages, data);

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


  const labels = [ "Tutkintotiedot", "Valitse tutkinnonosat", "Määritä tehtävät", "Yhteenveto" ]



  return (

    <div clasName="new-stepper">
      <div className="steps" style={{ gridTemplateColumns: 'repeat(4, 1fr)'}}>

        <div className="step-container">
          <div className="circle done">
            <Icon icon="zondicons:checkmark" color="white"/>
            {/* <span className="number">{ 1 }</span> */}
          </div>
          <span>Tutkintotiedot</span>
        </div>

        <div className="step-container">
          <div className="circle active">
{/*             <Icon icon="zondicons:checkmark" color="white"/> */}
            <span className="number active">{ 2 }</span>
          </div>
          <span>Valitse tutkinnonosat</span>
        </div>

        <div className="step-container">
          <div className="circle">
{/*             <Icon icon="zondicons:checkmark" color="white"/> */}
            <span className="number">{ 3 }</span>
          </div>
          <span>Määritä tehtävät</span>
        </div>
        
        <div className="step-container">
          <div className="circle">
{/*             <Icon icon="zondicons:checkmark" color="white"/> */}
            <span className="number">{ 4 }</span>
          </div>
          <span>Yhteenveto</span>
        </div>


      </div>

 {/*      <div className="text" style={{ gridTemplateColumns: `0.5fr auto 1fr auto 1fr auto 1fr auto 0.5fr` }}>
        {
          labels.map((text, i) => <span style={{ gridColumn: `${i * 2 + 2}` }}>{ "hi" }</span>)
        }
      </div> */}

    </div>

  );
};

Stepper.propTypes = {
  activePage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Stepper;
