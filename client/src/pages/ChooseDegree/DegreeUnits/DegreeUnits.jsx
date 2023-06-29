// Import react packages
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import libraries
import Pagination from '@mui/material/Pagination';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import Button from '../../../components/Button/Button';
import SelectUnit from '../../../components/SelectUnit/SelectUnit';
import DegreeContext from '../../../utils/context/DegreeContext';
import Searchbar from '../../../components/Searchbar/Searchbar';

function DegreeUnits() {
  const navigate = useNavigate();

  // Set path & get degree from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  
  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);
  
  // Save degree units to state once degree is fetched
  const degreeUnits = degree.units
  const [filteredUnits, setFilteredUnits] = useState(degreeUnits);

  useEffect(() => {
    setFilteredUnits(degreeUnits);
  }, [degree]);
  
  // Searchbar logic
  const handleSearch = (event) => {
    setPage(1); // Reset to the first page
    setFilteredUnits(
      degree.units.filter((unit) =>
      unit.name.fi.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  // Pagination logic
  const [page, setPage] = useState(1);
  const unitsPerPage = 4;
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  
  const indexOfLastUnit = page * unitsPerPage;
  const indexOfFirstUnit = indexOfLastUnit - unitsPerPage;
  const currentUnits = filteredUnits?.slice(indexOfFirstUnit, indexOfLastUnit);

  return (
    <main className='degreeUnits__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound && degree.name.fi} />
      <section className='degreeUnits__container'>
        <PageNumbers activePage={2}/>
        <h1>Valitse tutkinnon osat</h1>
        <Searchbar handleSearch={handleSearch} placeholder={'Etsi tutkinnonosat'}/>

        <div className='degreeUnits__container--units'>
          { currentUnits ? 
            currentUnits.map((unit) => (
              <SelectUnit key={unit._id} unit={unit} allUnits={degree.units}/>
            ))
          : 'ei dataa APIsta'}
        </div>

        <Pagination
          count={filteredUnits && Math.ceil(filteredUnits.length / unitsPerPage)}
          page={page}
          onChange={handlePageChange}
        />

        <div className='degreeUnits__container--buttons'>
          <div className='degreeUnits__container--buttons-back'>
            <Button
              text='Takaisin'
              onClick={() => navigate(`/degrees/${degree._id}`)}
              icon={'formkit:arrowleft'}
            />
          </div>
          <div className='degreeUnits__container--buttons-forward'>
            <Button
              text='Valitse tutkinnonosat'
              onClick={() => navigate('confirm-selection')}
              icon={'formkit:arrowright'}
            />
          </div>
        </div>
      </section>
      <UserNav />
    </main>
  );
}

export default DegreeUnits;
