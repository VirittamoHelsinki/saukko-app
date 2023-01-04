// importing react packages
import React, { useContext, useRef, useState, useEffect } from "react";

// importing components
import Button from "../../../components/Button/Button";

// importing context
import { FormContext, StepContext } from "../Context";

const Step1 = () => {
  // sending data to parent component from child
  const { formData, setFormData } = useContext(FormContext);

  // updating form step
  const { currentStep, setCurrentStep } = useContext(StepContext);

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
  });

  const { name, address, postalNum, city, phone, email, birthDate } = formState;

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
    },
    {
      nameRef,
      addressRef,
      postalNumRef,
      cityRef,
      phoneRef,
      emailRef,
      birthDateRef,
    } = refs;

  const handleSubmit = () => {
    // send data to parent component
    setFormData({
      ...formData,
      name: nameRef.current.value,
      address: addressRef.current.value,
      postalNum: postalNumRef.current.value,
      city: cityRef.current.value,
      phone: phoneRef.current.value,
      email: emailRef.current.value,
      birthDate: birthDateRef.current.value,
    });

    // go to next step
    setCurrentStep(currentStep + 1);
  };

  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(
      ![name, address, postalNum, city, phone, email, birthDate].every(
        (input) => input.length > 0
      )
    );
  }, [name, address, postalNum, city, phone, email, birthDate]);

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
      <h2>Omat tiedot</h2>
      <label htmlFor="">Nimi *</label>
      <input
        ref={nameRef}
        type="name"
        onChange={(e) => {
          setFormState({ ...formState, name: e.target.value });
        }}
        placeholder="Kirjoita koko nimesi"
      />
      <label htmlFor="">Osoite *</label>
      <input
        ref={addressRef}
        onChange={(e) => {
          setFormState({ ...formState, address: e.target.value });
        }}
        type="text"
        placeholder="Kirjoita osoitteesi"
      />
      <div className="firstLogin__container--form-double-container">
        <div className="firstLogin__container--form-double">
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
          />
        </div>
        <div className="firstLogin__container--form-double">
          <label htmlFor="">Kaupunki *</label>
          <input
            ref={cityRef}
            onChange={(e) => {
              setFormState({ ...formState, city: e.target.value });
            }}
            type="text"
            placeholder="Kirjoita kaupunkisi"
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
      />
      <label htmlFor="">Sähköposti *</label>
      <input
        ref={emailRef}
        onChange={(e) => {
          setFormState({ ...formState, email: e.target.value });
        }}
        type="email"
        placeholder="Kirjoita sähköpostiosoitteesi"
      />
      <label htmlFor="">Syntymäpäivä *</label>
      <input
        ref={birthDateRef}
        onChange={(e) => {
          setFormState({ ...formState, birthDate: e.target.value });
        }}
        type="date"
        placeholder="Valitse syntymäpäiväsi"
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
          text="Seuraava"
        />
      </section>
    </section>
  );
};

export default Step1;
