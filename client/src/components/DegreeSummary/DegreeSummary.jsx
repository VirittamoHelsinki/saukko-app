import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WavesHeader from '../Header/WavesHeader';
import { Button} from '@mui/material';

const DegreeSummary = ({ allInternalDegrees }) => {
  console.log('🚀 ~ DegreeDetail ~ allInternalDegrees:', allInternalDegrees);
  const { degreeId } = useParams();
  const navigate = useNavigate();
  console.log('🚀 ~ DegreeDetail ~ degreeId:', degreeId);
  const [degreeDetails, setDegreeDetails] = useState(null);
  console.log('🚀 ~ DegreeDetail ~ degreeDetails:', degreeDetails);

  useEffect(() => {
    // Fetch degreeDetails based on degreeId and set the state
    const fetchedDegreeDetails = allInternalDegrees.find((degree) => {
      console.log('🚀 ~ useEffect ~ degree:', degree);
      return degree._id === degreeId;
    });
    setDegreeDetails(fetchedDegreeDetails);
  }, [allInternalDegrees, degreeId]);

  const handleGoBack = () => {
    navigate('/degrees/add');   };
  if (!degreeDetails) {
    return <div>Loading...</div>;
  }

  // Find the specific degree details based on degreeId
  //   const degreeDetails = allInternalDegrees.find((degree) => degree._id === degreeId);

  //   if (!degreeDetails) {
  //     return <div>Details not found.</div>;
  //   }

  return (
    <main className='addDegree__wrapper'>
      <WavesHeader
        title='Saukko'
        secondTitle='Tutkintojen hallinta'
        disabled={false}
      />
      <div style={{ marginTop: '15rem' }}>
        {/* <h1>{degreeDetails.name.fi}</h1> */}
        {/* Display other degree details as needed */}
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {degreeDetails.name.fi}
        </h2>
        <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
          Tutkinnon osat ja tehtävät
        </h4>
        {degreeDetails.units.map((unit) => (
          <div key={unit._id}>
            <p>{unit.name.fi}</p>
            <hr />
          </div>
        ))}
        <h4 style={{ textAlign: 'center', margin: '2rem' }}>
          Tutkinnon tiedot
        </h4>
        <p>Määräyksen diarinumero: {degreeDetails.diaryNumber}</p>
        <p>Määräyksen päätöspäivämäärä: {degreeDetails.expiry}</p>
        <p>Voimantulo: {degreeDetails.validFrom}</p>
      </div>
      <div style={{display: 'flex'}}>
          <Button onClick={handleGoBack}>Takaisin</Button>
          <Button>Muokka tietoja</Button>
      </div>
    </main>
  );
};

export default DegreeSummary;
