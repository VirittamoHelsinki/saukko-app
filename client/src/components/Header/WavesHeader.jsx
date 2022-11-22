// import necessary components
import Waves from "./Waves/Waves";

// import helsinki logo
import HelsinkiLogo from "../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp";

const WavesHeader = () => {
  return (
    <main className="wavesHeader__wrapper">
      <img src={HelsinkiLogo} alt="" />
      <h1>Saukko</h1>
      <Waves />
    </main>
  );
};

export default WavesHeader;
