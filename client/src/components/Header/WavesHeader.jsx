// import necessary react components
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// import necessary components
import Waves from "./Waves/Waves";

// import helsinki logo
import HelsinkiLogo from "../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp";

const WavesHeader = () => {
  const navigate = useNavigate();

  return (
    <main className="wavesHeader__wrapper">
      <button onClick={() => navigate(-1)}>
        <Icon icon="typcn:arrow-left" />
      </button>
      <img src={HelsinkiLogo} alt="" />
      <h1>Saukko</h1>
      <Waves />
    </main>
  );
};

export default WavesHeader;
