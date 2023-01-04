// importing react packages
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// importing components
import WavesHeader from "../../components/Header/WavesHeader";

// importing context
import { ButtonContext, FormContext, StepContext } from "./Context";

// importing steps
import Step0 from "./Step0/Step0";
import Step1 from "./Step1/Step1";
import Step2 from "./Step2/Step2";

const PersonalForm = () => {
  // main data object
  const [formData, setFormData] = useState({});

  // temp log
  useEffect(() => {
    console.table(formData);
  }, [formData]);

  // set form current step
  const [currentStep, setCurrentStep] = useState(0);

  // context for form inputs filled
  const [stepsFilled, setStepsFilled] = useState(false, false);

  const navigate = useNavigate();
  // processes the registration after fields have been filled and the "register" button has been pressed
  const processForm = () => {
    console.table(formData);
    navigate("/home");
  };

  // browser window scroll-to-top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  return (
    <main className="firstLogin__wrapper">
      <WavesHeader title="Taustatiedot" fill="#0000bf" />
      <section className="firstLogin__container">
        <FormContext.Provider value={{ formData, setFormData }}>
          <div className="firstLogin__container--form">
            <StepContext.Provider value={{ currentStep, setCurrentStep }}>
              <ButtonContext.Provider value={{ stepsFilled, setStepsFilled }}>
                {(() => {
                  switch (currentStep) {
                    case 0:
                      return <Step0 />;
                    case 1:
                      return <Step1 />;
                    case 2:
                      return <Step2 />;
                    default:
                      return <bold>ERROR 404</bold>;
                  }
                })()}
              </ButtonContext.Provider>
            </StepContext.Provider>
          </div>
        </FormContext.Provider>
      </section>
    </main>
  );
};

export default PersonalForm;
