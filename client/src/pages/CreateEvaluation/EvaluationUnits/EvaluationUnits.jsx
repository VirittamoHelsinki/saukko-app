import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import Stepper from '../../../components/Stepper/Stepper';
import useUnitsStore from '../../../store/zustand/unitsStore';

const mockData = [
  {
    _id: '1',
    name: {
      fi: 'Huolto- ja korjaustyöt',
      sv: '',
    },
    assessments: [
      {
        _id: '11',
        name: {
          fi: '',
          sv: '',
        },    
      }
    ]    
  },
  {
    _id: '2',
    name: {
      fi: 'Maalauksen esikäsittelytyöt',
      sv: '',
    },
    assessments: [
      {
        _id: '22',
        name: {
          fi: '',
          sv: '',
        },    
      }
    ]    
  },
  {
    _id: '3',
    name: {
      fi: 'Huolto- ja korjaustyöt',
      sv: '',
    },
    assessments: [
      {
        _id: '33',
        name: {
          fi: '',
          sv: '',
        },    
      }
    ]    
  },
  {
    _id: '4',
    name: {
      fi: 'Maalauksen esikäsittelytyöt',
      sv: '',
    },
    assessments: [
      {
        _id: '44',
        name: {
          fi: '',
          sv: '',
        },    
      }
    ]    
  },
]

function EvaluationUnits() {
  const navigate = useNavigate();

  // Get units from unitStore
  const checkedUnits = useUnitsStore((state) => state.checkedUnits);

  // Check if at least one unit is chosen and redirect
  const handleValidation = () => {
    if (checkedUnits.length > 0) {
      navigate('/evaluation-summary')
    } else {
      alert('Choose units')
    }
  };

  // Stepper labels & urls
  const stepperData = [
    {
      label: 'Lisää tiedot',
      url: '/evaluation-form'
    },
    {
      label: 'Valitse työpaikka',
      url: '/evaluation-workplace'
    },
    {
      label: 'Valitse tutkinnonosat',
      url: '/evaluation-units'
    },
    {
      label: 'Aktivoi suoritus',
      url: '/evaluation-summary'
    },
  ];

  
  return (
    <main className='evaluationUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationUnits__container'>
        <Stepper
            activePage={3}
            totalPages={4}
            data={stepperData}
        />
        <h1>Degree name (FIX)</h1> {/* Degree name from workplace here */}

        <div className='evaluationUnits__container--units'>
          { mockData ? 
            mockData.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={mockData}/>
            ))
          : 'ei dataa APIsta'}
        </div>

        <PageNavigationButtons handleBack={() => navigate(`/evaluation-workplace`)} handleForward={handleValidation} forwardButtonText={'Seuraava'}/>
      </section>      
      <UserNav />
    </main>
  );
}

export default EvaluationUnits;
