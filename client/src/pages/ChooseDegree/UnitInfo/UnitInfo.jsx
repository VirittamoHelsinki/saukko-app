// Import react packages
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import DegreeContext from '../../../utils/context/DegreeContext';

function UnitInfo() {
  const navigate = useNavigate();

  // Get degree from DegreeContext
  const { degree, degreeFound } = useContext(DegreeContext);
  console.log('degree', degree)

  // Find unit & save to state
  const params = useParams();
  const [unit, setUnit] = useState({});
  
  useEffect(() => {
    if (degreeFound) {
      const paramsIdAsNumber = parseInt(params.unitId)
      const matchedUnit = degree.units.find((unit) => unit._id === paramsIdAsNumber)
      setUnit(matchedUnit);
    } else {
      console.log('Unit not found')
    }
    console.log('unit:', unit)
  }, [degree]);

  // Check if unit object is empty
  const unitFound = Object.keys(unit).length > 0 ? true : false

  return (
    <main className="unitInfo__wrapper">
      <WavesHeader title="Saukko" secondTitle={degreeFound && degree.name.fi} />
      <section className="unitInfo__container">
        <h1>{unitFound ? unit.name.fi : 'Some unit, 30 osp'}</h1>
        <h2>Ammattitaitovaatimukset</h2>
        <h3>Opiskelija osaa:</h3>
        {/* Currently unit.assessments is an empty array - Fix this once assessment data ready */}
        {unit.assessments?.length > 0 && unit.assessments.map((assessment) => {
          <p>Bullet points here</p>
        })}
      </section>
      <UserNav />
    </main>
  );
}

export default UnitInfo;
