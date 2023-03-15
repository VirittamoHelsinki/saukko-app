// importing react packages
import React, { useContext, useRef, useState, useEffect } from "react";

// importing components
import Button from "../../../components/Button/Button";

// importing context
import { FormContext, StepContext } from "../Context";

const Step2 = () => {
  // sending data to parent component from child
  const { formData, setFormData } = useContext(FormContext);

  // updating form step
  const { currentStep, setCurrentStep } = useContext(StepContext);

  // enables/disables the next step button
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // store change for input field length check
  const [formState, setFormState] = useState({
    workPlace: "",
    workTasks: "",
    contactPerson: "",
    workNumber: "",
    workAddress: "",
    studyGoals: "",
  });

  const {
    workPlace,
    workTasks,
    contactPerson,
    workNumber,
    workAddress,
    studyGoals,
  } = formState;

  // pulls form input values when submitted
  const refs = {
      workPlaceRef: useRef(),
      workTasksRef: useRef(),
      contactPersonRef: useRef(),
      workNumberRef: useRef(),
      workAddressRef: useRef(),
      studyGoalsRef: useRef(),
    },
    {
      workPlaceRef,
      workTasksRef,
      contactPersonRef,
      workNumberRef,
      workAddressRef,
      studyGoalsRef,
    } = refs;

  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(
      ![
        workPlace,
        workTasks,
        contactPerson,
        workNumber,
        workAddress,
        studyGoals,
      ].every((input) => input.length > 0)
    );
  }, [
    workPlace,
    workTasks,
    contactPerson,
    workNumber,
    workAddress,
    studyGoals,
  ]);

  const handleSubmit = () => {
    setFormData({
      ...formData,
      workPlace: workPlaceRef?.current.value,
      workTasks: workTasksRef?.current.value,
      contactPerson: contactPersonRef?.current.value,
      workNumber: workNumberRef?.current.value,
      workAddress: workAddressRef?.current.value,
      studyGoals: studyGoalsRef?.current.value,
    });
  };

  // button styling/CSS
  const buttonStyleDisabled = {
      color: "var(--saukko-main-white)",
      border: "var(--link-disabled)",
      background: "var(--link-disabled)",
    },
    buttonStyleEnabled = {
      color: "var(--saukko-main-white)",
      border: "var(--saukko-main-black)",
      background: "var(--saukko-main-black)",
    };

  return (
    <section className="firstLogin__container--form-text">
      <h2>Työpaikan tiedot</h2>
      <label htmlFor="">Työpaikkasi nimi *</label>
      <input
        ref={workPlaceRef}
        type="name"
        onChange={(e) => {
          setFormState({ ...formState, workPlace: e.target.value });
        }}
        placeholder="Kirjoita työpaikkasi nimi"
      />
      <label htmlFor="">Työtehtäväsi *</label>
      <input
        ref={workTasksRef}
        onChange={(e) => {
          setFormState({ ...formState, workTasks: e.target.value });
        }}
        type="text"
        placeholder="Syötä työtehtäväsi"
      />
      <label htmlFor="">Työpaikan yhteyshenkilö *</label>
      <input
        ref={contactPersonRef}
        onChange={(e) => {
          setFormState({ ...formState, contactPerson: e.target.value });
        }}
        type="name"
        placeholder="Kirjoita yhteyshenkilön nimi"
      />
      <label htmlFor="">Työpaikan puhelinnumero *</label>
      <input
        ref={workNumberRef}
        onChange={(e) => {
          setFormState({ ...formState, workNumber: e.target.value });
        }}
        type="number"
        placeholder="Syötä työpaikan puhelinnumero"
      />
      <label htmlFor="">Työpaikan osoite *</label>
      <input
        ref={workAddressRef}
        onChange={(e) => {
          setFormState({ ...formState, workAddress: e.target.value });
        }}
        type="text"
        placeholder="Kirjota työpaikan osoite"
      />

      <label htmlFor="">Omat tavoitteesi *</label>
      <textarea
        ref={studyGoalsRef}
        onChange={(e) => {
          setFormState({ ...formState, studyGoals: e.target.value });
        }}
        type="text"
        placeholder="Listaa opiskelu tavoitteesi"
      />
      <p>
        Tuliko ongelma vastaan? <a href="/">Pyydä apua</a>
      </p>
      <section className="firstLogin__form--bottom-step2">
        <Button
          style={buttonStyleEnabled}
          onClick={() => setCurrentStep(currentStep - 1)}
          type=""
          text="Takaisin"
        />
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={() => handleSubmit()}
          type=""
          text="Lähetä"
        />
      </section>
    </section>
  );
};

export default Step2;
