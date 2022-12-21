// importing react packages
import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios
// import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";

const PersonalForm = () => {
  // set form current step
  const [currentStep, setCurrentStep] = useState(1);

  // enables/disables the next step button
  const [buttonDisabled, setButtonDisabled] = useState(true);

  // store change for input field length check
  const [formState, setFormState] = useState({
    name: "",
    address: "",
    postalNum: "",
    city: "",
    phone: "",
    email: "",
    birthDate: "",
    workPlace: "",
    workTasks: "",
    contactPerson: "",
    workNumber: "",
    workAddress: "",
    studyGoals: "",
  });

  const {
    name,
    address,
    postalNum,
    city,
    phone,
    email,
    birthDate,
    workPlace,
    workTasks,
    contactPerson,
    workNumber,
    workAddress,
    studyGoals,
  } = formState;

  // pulls form input values when submitted
  const refs = {
    formRef: useRef(),
    nameRef: useRef(),
    addressRef: useRef(),
    postalNumRef: useRef(),
    cityRef: useRef(),
    phoneRef: useRef(),
    emailRef: useRef(),
    birthDateRef: useRef(),
    workPlace: useRef(),
    workTasks: useRef(),
    contactPerson: useRef(),
    workNumber: useRef(),
    workAddress: useRef(),
    studyGoals: useRef(),
  };

  const {
    formRef,
    nameRef,
    addressRef,
    postalNumRef,
    cityRef,
    phoneRef,
    emailRef,
    birthDateRef,
    workPlaceRef,
    workTasksRef,
    contactPersonRef,
    workNumberRef,
    workAddressRef,
    studyGoalsRef,
  } = refs;

  // change page
  //const navigate = useNavigate();

  // processes the registration after fields have been filled and the "register" button has been pressed
  const processForm = () => {
    const formData = [
      {
        name: nameRef.current.value,
        address: addressRef.current.value,
        postalNum: postalNumRef.current.value,
        city: cityRef.current.value,
        phone: phoneRef.current.value,
        email: emailRef.current.value,
        birthDate: birthDateRef.current.value,
        workPlace: workPlaceRef.current.value,
        workTasks: workTasksRef.current.value,
        contactPerson: contactPersonRef.current.value,
        workNumber: workNumberRef.current.value,
        workAddress: workAddressRef.current.value,
        studyGoals: studyGoalsRef.current.value,
      },
    ];

    console.table(formData);
    // validate inputs
    console.log(EmailValidator.validate(emailRef.current.value));
  };

  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(
      ![
        name,
        address,
        postalNum,
        city,
        phone,
        email,
        birthDate,
        workPlace,
        workTasks,
        contactPerson,
        workNumber,
        workAddress,
        studyGoals,
      ].every((input) => input.length > 0)
    );
  }, [
    name,
    address,
    postalNum,
    city,
    phone,
    email,
    birthDate,
    workPlace,
    workTasks,
    contactPerson,
    workNumber,
    workAddress,
    studyGoals,
  ]);

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
    <main className="personalForm__wrapper">
      <WavesHeader title="Taustatiedot" fill="#0000bf" />
      <section className="personalForm__container">
        <form ref={formRef} onSubmit={processForm}>
          {currentStep === 1 ? (
            // STEP 1 OF FORM
            <section className="personalForm__container--form-text">
              <h2>Omat tiedot</h2>
              <label htmlFor="">Nimi *</label>
              <input
                ref={nameRef}
                type="name"
                onChange={(e) => {
                  setFormState({ ...formState, name: e.target.value });
                }}
                placeholder="Kirjoita koko nimesi"
                value={formState.name}
              />
              <label htmlFor="">Osoite *</label>
              <input
                ref={addressRef}
                onChange={(e) => {
                  setFormState({ ...formState, address: e.target.value });
                }}
                type="text"
                placeholder="Kirjoita osoitteesi"
                value={formState.address}
              />
              <div className="personalForm__container--form-double-container">
                <div className="personalForm__container--form-double">
                  <label htmlFor="">Postinumero *</label>
                  <input
                    ref={postalNumRef}
                    onChange={(e) => {
                      setFormState({
                        ...formState,
                        postalNum: e.target.value,
                      });
                    }}
                    type="number"
                    placeholder="Kirjoita postinumerosi"
                    value={formState.postalNum}
                  />
                </div>
                <div className="personalForm__container--form-double">
                  <label htmlFor="">Kaupunki *</label>
                  <input
                    ref={cityRef}
                    onChange={(e) => {
                      setFormState({ ...formState, city: e.target.value });
                    }}
                    type="text"
                    placeholder="Kirjoita kaupunkisi"
                    value={formState.city}
                  />
                </div>
              </div>
              <label htmlFor="">Puhelin *</label>
              <input
                ref={phoneRef}
                onChange={(e) => {
                  setFormState({ ...formState, phone: e.target.value });
                }}
                type="number"
                placeholder="Kirjoita puhelinnumerosi"
                value={formState.phone}
              />
              <label htmlFor="">Sähköposti *</label>
              <input
                ref={emailRef}
                onChange={(e) => {
                  setFormState({ ...formState, email: e.target.value });
                }}
                type="email"
                placeholder="Kirjoita sähköpostiosoitteesi"
                value={formState.email}
              />
              <label htmlFor="">Syntymäpäivä *</label>
              <input
                ref={birthDateRef}
                onChange={(e) => {
                  setFormState({ ...formState, birthDate: e.target.value });
                }}
                type="date"
                placeholder="Valitse syntymäpäiväsi"
                value={formState.birthDate}
              />
              <p>
                Tuliko ongelma vastaan? <a href="/">Pyydä apua</a>
              </p>
              <section className="personalForm__form--bottom">
                <Button
                  style={buttonStyleEnabled}
                  onClick={() => setCurrentStep(currentStep + 1)}
                  type=""
                  text="Seuraava"
                />
              </section>
            </section>
          ) : (
            // STEP 2 OF FORM
            <section className="personalForm__container--form-text">
              <h2>Työpaikan tiedot</h2>
              <label htmlFor="">Työpaikkasi nimi *</label>
              <input
                ref={workPlaceRef}
                type="name"
                onChange={(e) => {
                  setFormState({ ...formState, workPlace: e.target.value });
                }}
                placeholder="Kirjoita työpaikkasi nimi"
                value={formState.workPlace}
              />
              <label htmlFor="">Työtehtäväsi *</label>
              <input
                ref={workTasksRef}
                onChange={(e) => {
                  setFormState({ ...formState, workTasks: e.target.value });
                }}
                type="text"
                placeholder="Syötä työtehtäväsi"
                value={formState.workTasks}
              />
              <label htmlFor="">Työpaikan yhteyshenkilö *</label>
              <input
                ref={contactPersonRef}
                onChange={(e) => {
                  setFormState({ ...formState, contactPerson: e.target.value });
                }}
                type="name"
                placeholder="Kirjoita yhteyshenkilön nimi"
                value={formState.contactPerson}
              />
              <label htmlFor="">Työpaikan puhelinnumero *</label>
              <input
                ref={workNumberRef}
                onChange={(e) => {
                  setFormState({ ...formState, workNumber: e.target.value });
                }}
                type="number"
                placeholder="Syötä työpaikan puhelinnumero"
                value={formState.workNumber}
              />
              <label htmlFor="">Työpaikan osoite *</label>
              <input
                ref={workAddressRef}
                onChange={(e) => {
                  setFormState({ ...formState, workAddress: e.target.value });
                }}
                type="text"
                placeholder="Kirjota työpaikan osoite"
                value={formState.workAddress}
              />

              <label htmlFor="">Omat tavoitteesi *</label>
              <input
                ref={studyGoalsRef}
                onChange={(e) => {
                  setFormState({ ...formState, studyGoals: e.target.value });
                }}
                type="text"
                placeholder="Listaa opiskelu tavoitteesi"
                value={formState.studyGoals}
              />
              <p>
                Tuliko ongelma vastaan? <a href="/">Pyydä apua</a>
              </p>
              <section className="personalForm__form--bottom-step2">
                <Button
                  style={buttonStyleEnabled}
                  onClick={() => setCurrentStep(currentStep - 1)}
                  type=""
                  text="Takaisin"
                />
                <Button
                  style={
                    buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled
                  }
                  onClick={() =>
                    buttonDisabled
                      ? console.log("button disabled")
                      : processForm()
                  }
                  type="submit"
                  text="Lähetä"
                />
              </section>
            </section>
          )}
        </form>
      </section>
    </main>
  );
};

export default PersonalForm;
