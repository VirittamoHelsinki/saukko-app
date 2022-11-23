// import necessary react components
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

// import helsinki logo
import HelsinkiLogo from "../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp";

// waves SVG
const Waves = () => {
  return (
    <svg
      width="315"
      height="49"
      viewBox="0 0 315 49"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M314.4 4.80002C306.5 4.80002 306.5 0 298.6 0C290.7 0 290.7 4.80002 282.9 4.80002C275 4.80002 275 0 267.2 0C259.3 0 259.3 4.80002 251.5 4.80002C243.6 4.80002 243.6 0 235.8 0C227.9 0 227.9 4.80002 220.1 4.80002C212.2 4.80002 212.2 0 204.4 0C196.6 0 196.5 4.80002 188.7 4.80002C180.8 4.80002 180.8 0 173 0C165.1 0 165.1 4.80002 157.3 4.80002C149.4 4.80002 149.4 0 141.6 0C133.8 0 133.7 4.80002 125.9 4.80002C118 4.80002 118 0 110.2 0C102.3 0 102.3 4.80002 94.5 4.80002C86.6 4.80002 86.6 0 78.8 0C70.9 0 70.9 4.80002 63.1 4.80002C55.2 4.80002 55.2 0 47.4 0C39.5 0 39.5 4.80002 31.7 4.80002C23.8 4.80002 23.8 0 16 0C8.2 0 8.09999 4.80002 0.299988 4.80002C0.199988 4.80002 0.1 4.80002 0 4.80002V48.1H314.9V4.80002H314.4Z"
        fill="#9fc9eb"
      />
    </svg>
  );
};

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
