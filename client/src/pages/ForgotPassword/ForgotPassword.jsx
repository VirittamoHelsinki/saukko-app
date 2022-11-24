// importing react packages
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// import axios to connect to the backend with
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();

  // stores form input info
  const formRef = useRef(),
    emailRef = useRef();

  // change page
  const navigate = useNavigate();

  // processes the login after fields have been filled and the "login" button has been pressed
  const processForgotPassword = (e) => {
    const email = emailRef.current.value;

    // validate inputs
    console.log(EmailValidator.validate(email));

    // sending data from form to the backend
    axios
      .post("/forgot-password", {
        email: email,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(email);
  };

  // enable login button style if fields are filled
  useEffect(() => {
    if (email.length > 0) {
      return setButtonDisabled(false);
    }
    return setButtonDisabled(true);
  }, [email]);

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
    <main className="forgotPassword__wrapper">
      <WavesHeader />
      <section className="forgotPassword__container">
        <h2>Unohtuiko salasana?</h2>
        <p>Lähetämme sähköpostin, jossa on ohjeet salasanan vaihtamiseen</p>
        <form ref={formRef} onSubmit={processForgotPassword}>
          <section className="forgotPassword__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              ref={emailRef}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
          </section>
        </form>
      </section>
      <section className="forgotPassword__form--bottom">
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={() =>
            buttonDisabled
              ? console.log("button disabled")
              : processForgotPassword()
          }
          type="submit"
          text="Lähetä"
        />
      </section>
    </main>
  );
};

export default ForgotPassword;
