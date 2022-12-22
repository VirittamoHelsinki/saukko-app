// importing react packages
import { useNavigate } from "react-router-dom";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const PickAccontType = () => {
  // initialize navigation
  const navigate = useNavigate();

  // process button click
  const processClick = (value) => {
    const accType = {
      type: value,
    };

    console.table(accType);

    navigate("/home");
  };

  return (
    <main className="pickAccountType__wrapper">
      <WavesHeader title="Tilityypit" fill="#0000bf" />
      <section className="pickAccountType__container">
        <div className="pickAccountType__container--text">
          <h2>Valitse</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            hendrerit pretium purus at cursus. Cras eu nisi eget odio euismod
            volutpat a nec risus.
          </p>
        </div>
        <div className="pickAccountType__container--buttons">
          <Button onClick={() => processClick("student")} text="Oppilas" />
          <Button onClick={() => processClick("teacher")} text="Opettaja" />
          <Button
            onClick={() => processClick("supervisor")}
            text="Työpaikan ohjaaja"
          />
        </div>
      </section>
    </main>
  );
};

export default PickAccontType;
