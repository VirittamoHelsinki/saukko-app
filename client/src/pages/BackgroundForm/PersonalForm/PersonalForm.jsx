// importing react packages
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import axios
// import axios from "axios";

// importing components
import Button from "../../../components/Button/Button";
import WavesHeader from "../../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";

const PersonalForm = () => {
  // store change for input field length check
  const [name, setName] = useState(""),
    [address, setAddress] = useState(""),
    [postalNum, setPostalNum] = useState(""),
    [city, setCity] = useState(""),
    [phone, setPhone] = useState(""),
    [email, setEmail] = useState(""),
    [birthDate, setBirthDate] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();

  // stores form input info
  const formRef = useRef(),
    nameRef = useRef(),
    addressRef = useRef(),
    postalNumRef = useRef(),
    cityRef = useRef(),
    phoneRef = useRef(),
    emailRef = useRef(),
    birthDateRef = useRef();

  // change page
  const navigate = useNavigate();

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
    if (
      name.length > 0 &&
      address.length > 0 &&
      postalNum.length > 0 &&
      city.length > 0 &&
      phone.length > 0 &&
      email.length > 0 &&
      birthDate.length > 0
    ) {
      return setButtonDisabled(false);
    }
    return setButtonDisabled(true);
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
                setName(e.target.value);
              }}
              placeholder="Kirjoita koko nimesi"
            />
            <label htmlFor="">Osoite *</label>
            <input
              ref={addressRef}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              type="text"
              placeholder="Kirjoita osoitteesi"
            />
            <div className="personalForm__container--form-double-container">
              <div className="personalForm__container--form-double">
                <label htmlFor="">Postinumero *</label>
                <input
                  ref={postalNumRef}
                  onChange={(e) => {
                    setPostalNum(e.target.value);
                  }}
                  type="number"
                  placeholder="Kirjoita postinumerosi"
                />
              </div>
              <div className="personalForm__container--form-double">
                <label htmlFor="">Kaupunki *</label>
                <input
                  ref={cityRef}
                  onChange={(e) => {
                    setCity(e.target.value);
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
                setPhone(e.target.value);
              }}
              type="number"
              placeholder="Kirjoita puhelin-numerosi"
            />
            <label htmlFor="">Sähköposti *</label>
            <input
              ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              placeholder="Kirjoita sähköpostiosoitteesi"
            />
            <label htmlFor="">Syntymäpäivä *</label>
            <input
              ref={birthDateRef}
              onChange={(e) => {
                setBirthDate(e.target.value);
              }}
              type="date"
              placeholder="Valitse syntymäpäiväsi"
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
