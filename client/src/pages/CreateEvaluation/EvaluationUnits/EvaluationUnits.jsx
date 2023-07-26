import React from 'react';
import { useNavigate } from 'react-router-dom';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNavigationButtons from '../../../components/PageNavigationButtons/PageNavigationButtons';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';

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

  return (
    <main className='evaluationUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle='Suorituksen aktivoiminen' />
      <section className='evaluationUnits__container'>
        <div>Stepper here (waiting for update)</div>
        <h1>Degree name</h1>

        <div className='evaluationUnits__container--units'>
          { mockData ? 
            mockData.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={mockData}/>
            ))
          : 'ei dataa APIsta'}
        </div>

        <PageNavigationButtons handleBack={() => navigate(`/evaluation-workplace`)} handleForward={() => navigate(`/evaluation-summary`)} forwardButtonText={'Seuraava'}/>
      </section>      
      <UserNav />
    </main>
  );
}

export default EvaluationUnits;
