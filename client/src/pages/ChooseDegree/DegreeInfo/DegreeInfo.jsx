// Import react packages & dependencies
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from "../../../components/UserNav/UserNav";
import AuthContext from "../../../utils/context/AuthContext";


function DegreeInfo() {
  return (
    <main className="degreeInfo__wrapper">
        <WavesHeader title="Saukko" secondTitle="Autoalan perustutkinto" fill="#9fc9eb" />
        <section className="degreeInfo__container">
            <div className="degreeInfo__container--nav">
                <div>
                    <Icon icon="iconamoon:number-1-circle-thin" />
                    <p>Valitse tutkinto</p>
                </div>
                <div>
                    <Icon icon="iconamoon:number-2-circle-thin" />
                    <p>Valitse tutkinnonosat</p>
                </div>
                <div>
                    <Icon icon="iconamoon:number-3-circle-thin" />
                    <p>Vahvista pyyntö</p>
                </div>
            </div>
            <div className="degreeInfo__container--info"></div>
        </section>
        <UserNav />
    </main>
  )
}

export default DegreeInfo