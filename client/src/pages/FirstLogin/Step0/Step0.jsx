// importing react packages
import React, { useContext } from "react";

// importing context
import { FormContext, StepContext } from "../Context";

// importing components
import Button from "../../../components/Button/Button";

const Step0 = () => {
  // sending data to parent component from child
  const { formData, setFormData } = useContext(FormContext);

  // updating form step
  const { currentStep, setCurrentStep } = useContext(StepContext);

  // process button click
  const processClick = (value) => {
    // send data to parent component
    setFormData({ ...formData, accountType: value });

    // temp log
    console.table({ accountType: value });

    // go to next step
    setCurrentStep(currentStep + 1);
  };

  return (
    <main className="pickAccountType__wrapper">
      <section className="pickAccountType__container">
        <div className="pickAccountType__container--text">
          <h2>Valitse tilityyppi</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            hendrerit pretium purus at cursus. Cras eu nisi eget odio euismod
            volutpat a nec risus.
          </p>
        </div>
        <div className="pickAccountType__container--buttons">
          <Button onClick={() => processClick("client")} text="Asiakas" />
          <Button onClick={() => processClick("teacher")} text="Opettaja" />
          <Button
            onClick={() => processClick("supervisor")}
            text="Työpaikkaohjaaja"
          />
        </div>
      </section>
    </main>
  );
};

export default Step0;
