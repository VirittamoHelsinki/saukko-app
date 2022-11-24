// importing react packages
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";
import { passwordVal } from "../../utils/PasswordValidate";

const RegisterPage = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [passwordConfirm, setPasswordConfirm] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();

  // stores form input info
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  // change page
  const navigate = useNavigate();

  // processes the registration after fields have been filled and the "register" button has been pressed
  const processRegistration = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

    // validate inputs
    console.log(EmailValidator.validate(email));
    console.log(passwordVal.validate(password));
    console.log(passwordVal.validate(passwordConfirm));

    // check if passwords match
    if (password === passwordConfirm) {
      // sending data from form to the backend
      axios
        .post("/register", {
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
        })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
    } else {
      console.log("Salasanat eivät ole samoja.");
    }
  };

  // enable login button style if fields are filled
  useEffect(() => {
    if (email.length > 0 && password.length > 0 && passwordConfirm.length > 0) {
      return setButtonDisabled(false);
    }
    return setButtonDisabled(true);
  }, [email, password, passwordConfirm]);

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
    <main className="registerPage__wrapper">
      <WavesHeader />
      <section className="registerPage__container">
        <h2>Rekisteröidy</h2>
        <form ref={formRef} onSubmit={processRegistration}>
          <section className="registerPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              ref={emailRef}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              ref={passwordRef}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Valitse salasanasi."
            />
            <input
              ref={passwordConfirmRef}
              type="password"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
              placeholder="Kirjoita salasana uudelleen."
            />
            <p>
              Jos sinulla on jo tili <a href="/login">Kirjaudu sisään</a>
            </p>
          </section>
        </form>
      </section>
      <section className="registerPage__form--bottom">
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={() =>
            buttonDisabled
              ? console.log("button disabled")
              : processRegistration()
          }
          type="submit"
          text="Luo tili"
        />
      </section>
    </main>
  );
};

export default RegisterPage;
