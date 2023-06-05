// Import react packages & dependencies
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Import components
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from "../../../components/UserNav/UserNav";
import AuthContext from "../../../utils/context/AuthContext";


function DegreeInfo() {
  return (
    <WavesHeader title="Koulutukset" secondTitle="Ammatilliset koulutukset" fill="#9fc9eb" disabled={false} />

  )
}

export default DegreeInfo