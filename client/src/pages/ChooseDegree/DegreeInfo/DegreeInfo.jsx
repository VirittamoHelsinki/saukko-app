// Import react packages
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Import components
import DegreeContext from '../../../utils/context/DegreeContext';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import PageNumbers from '../../../components/PageNumbers/PageNumbers';
import Hyperlink from '../../../components/Hyperlink/Hyperlink';
import Button from '../../../components/Button/Button';

function DegreeInfo() {
  const navigate = useNavigate();
  
  // Set path & get degree from DegreeContext
  const { setDegreeId, degree, degreeFound } = useContext(DegreeContext);
  const params = useParams();
  
  useEffect(() => {
    setDegreeId(params.degreeId);
  }, []);

  console.log('degree from context:', degree)

  // Parse date
  function parseDate(milliseconds) {
    if (milliseconds === null) {
      return null
    } else {
      const dateObj = new Date(milliseconds);
      const options = { day: 'numeric', month: 'long', year: 'numeric' };
      const finnishLocale = 'fi-FI';
      const finnishDate = dateObj.toLocaleDateString(finnishLocale, options);
      return finnishDate.replace(/(\d+)\s+(\w+)\s+(\d+)/, '$1. $2 $3.');
    }
  }
  
  return (
    <main className='degreeInfo__wrapper'>
      <WavesHeader title='Saukko' secondTitle={degreeFound ? degree.name.fi : 'ei dataa APIsta'} />
      <section className='degreeInfo__container'>
        <PageNumbers activePage={1} totalPages={3}/>
        <div className='degreeInfo__container--info'>
          <div className='degreeInfo__container--info--block'>
            <h1>Tutkinnon suorittaneen osaaminen</h1>
            <p>Lorem ipsum dolor sit amet, pri eu aperiri ancillae, eu omnes integre eam, vis et esse primis legendos. His commodo maiestatis te, graeco persius iudicabit sed ea. Nec te nihil discere interesset. Veniam signiferumque eam cu. Legere debitis delectus ei his, laoreet debitis apeirian quo te. No putant fastidii invenire vis, mei te facete molestie vituperatoribus, vitae euismod an mei.
            </p>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Perusteen nimi</h2>
            <p>{degreeFound ? degree.name.fi : 'ei dataa APIsta'}</p>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Määräyksen diaarinumero</h2>
            <p>{degreeFound ? degree.diaryNumber : 'ei dataa APIsta'}</p>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Määräyksen päätöspäivämäärä</h2>
            <p>{degreeFound ? parseDate(degree.regulationDate) : 'ei dataa APIsta'}</p>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Voimaantulo</h2>
            <p>{degreeFound ? parseDate(degree.validFrom) : 'ei dataa APIsta'}</p>
          </div>
          <div className='degreeInfo__container--info--block dark'>
            <h2>Voimassaolon päättyminen</h2>
            <p>{degreeFound ? parseDate(degree.expiry) : 'ei dataa APIsta'}</p>
          </div>
          <div className='degreeInfo__container--info--block'>
            <h2>Siirtymäajan päättymisaika</h2>
            <p>{degreeFound ? parseDate(degree.transitionEnds) : 'ei dataa APIsta'}</p>
          </div>
        </div>
        
        <Hyperlink 
          linkText={'Lue lisää tästä linkistä'} 
          linkSource={degree.examInfoURL}
        />
          
        <div className='degreeInfo__container--buttons'>
          <div className='degreeInfo__container--buttons-back'>
            <Button
              text='Takaisin'
              onClick={() => navigate('/degrees')}
              icon={'formkit:arrowleft'}
            />
          </div>
          <div className='degreeInfo__container--buttons-forward'>
            <Button
              text='Valitse tutkinto'
              onClick={() => navigate(`/degrees/${degree._id}/units`)}
              icon={'formkit:arrowright'}
            />
          </div>
        </div>
      </section>
      <UserNav />
    </main>
  )
}

export default DegreeInfo