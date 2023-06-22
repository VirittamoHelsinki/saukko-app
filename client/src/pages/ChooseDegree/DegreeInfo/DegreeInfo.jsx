// Import react packages & dependencies
import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DegreeContext from '../../../utils/context/DegreeContext';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from "../../../components/UserNav/UserNav";
import PageNumbers from "../../../components/PageNumbers/PageNumbers";
import Hyperlink from "../../../components/Hyperlink/Hyperlink";
import Button from "../../../components/Button/Button";

function DegreeInfo() {
  const navigate = useNavigate();
  
  // Set path & get degree from DegreeContext
  const { setPath, degree } = useContext(DegreeContext);
  const params = useParams();
  
  useEffect(() => {
    setPath(params.degreeId);
  }, []);

  console.log('degree from context', degree)

  // Check if degree object is empty  
  const degreeFound = Object.keys(degree).length > 0 ? true : false
  
  return (
    <main className="degreeInfo__wrapper">
        <WavesHeader title="Saukko" secondTitle={degreeFound ? degree.name.fi : 'Tutkinnon nimi'} />
        <section className="degreeInfo__container">
            <PageNumbers activePage={1}/>
            <div className="degreeInfo__container--info">
              <div className="degreeInfo__container--info--block">
                <h1>Tutkinnon suorittaneen osaaminen</h1>
                <p>Lorem ipsum dolor sit amet, pri eu aperiri ancillae, eu omnes integre eam, vis et esse primis legendos. His commodo maiestatis te, graeco persius iudicabit sed ea. Nec te nihil discere interesset. Veniam signiferumque eam cu. Legere debitis delectus ei his, laoreet debitis apeirian quo te. No putant fastidii invenire vis, mei te facete molestie vituperatoribus, vitae euismod an mei.
                </p>
              </div>
              <div className="degreeInfo__container--info--block dark">
                <h2>Perusteen nimi</h2>
                <p>Autoalan perustutkinto</p>
              </div>
              <div className="degreeInfo__container--info--block">
                <h2>Määräyksen diaarinumero</h2>
                <p>1234567</p>
              </div>
              <div className="degreeInfo__container--info--block dark">
                <h2>Määräyksen päätöspäivämäärä</h2>
                <p>29. joulukuuta 2017</p>
              </div>
              <div className="degreeInfo__container--info--block">
                <h2>Voimaantulo</h2>
                <p>1. elokuuta 2018</p>
              </div>
              <div className="degreeInfo__container--info--block dark">
                <h2>Voimassaolon päättyminen</h2>
                <p>31. Heinäkuuta 2022</p>
              </div>
              <div className="degreeInfo__container--info--block">
                <h2>Siirtymäajan päättymisaika</h2>
                <p>31. Heinäkuuta 2026</p>
              </div>
            </div>
            <Hyperlink linkText={"Lue lisää tästä linkistä"} linkSource={"https://eperusteet.opintopolku.fi/#/fi/ammatillinenperustutkinto/3397336/tiedot"}/>
            
          <div className="degreeInfo__container--buttons">
            <div className="degreeInfo__container--buttons-back">
              <Button
                text="Takaisin"
                onClick={() => navigate('/search')}
                icon={"formkit:arrowleft"}
              />
            </div>
            <div className="degreeInfo__container--buttons-forward">
              <Button
                text="Valitse tutkinto"
                onClick={() => navigate('/degree-units')}
                icon={"formkit:arrowright"}
              />
            </div>
          </div>

        </section>
        <UserNav />
    </main>
  )
}

export default DegreeInfo