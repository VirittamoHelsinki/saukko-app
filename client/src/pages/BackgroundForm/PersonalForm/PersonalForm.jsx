// importing react packages
import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// import axios
// import axios from "axios";

// importing components
import Button from "../../../components/Button/Button";
import WavesHeader from "../../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";

const PersonalForm = () => {
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
      },
    ];

    console.table(formData);
    // validate inputs
    console.log(EmailValidator.validate(emailRef.current.value));
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
    <main className="personalForm__wrapper">
      <WavesHeader title="Taustatiedot" fill="#0000bf" />
      <section className="personalForm__container">
        <h2>Omat tiedot</h2>
        <form ref={formRef} onSubmit={processForm}>
          <section className="personalForm__container--form-text">
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
                    setFormState({ ...formState, postalNum: e.target.value });
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
              placeholder="Kirjoita puhelin-numerosi"
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
                style={
                  buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled
                }
                onClick={() =>
                  buttonDisabled
                    ? console.log("button disabled")
                    : processForm()
                }
                type="submit"
                text="Seuraava"
              />
            </section>
          </section>
        </form>
      </section>
    </main>
  );
};

export default PersonalForm;
