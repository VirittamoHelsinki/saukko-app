// Import react packages & dependencies
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from "../../../components/UserNav/UserNav";
import PageNumbers from "../../../components/PageNumbers/PageNumbers";
import AuthContext from "../../../utils/context/AuthContext";

function DegreeInfo() {
  return (
    <main className="degreeInfo__wrapper">
        <WavesHeader title="Saukko" secondTitle="Autoalan perustutkinto" fill="#9fc9eb" />
        <section className="degreeInfo__container">
            <PageNumbers activePage={1}/>
            <div className="degreeInfo__container--info"></div>
        </section>
        <UserNav />
    </main>
  )
}

export default DegreeInfo