// importing react packages
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// import axios to connect to the backend with
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const ForgotPassword = () => {
  // stores form input info
  const formRef = useRef(),
    emailRef = useRef();

  // change page
  const navigate = useNavigate();
  console.log(navigate);

  // processes the login after fields have been filled and the "login" button has been pressed
  const processLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;

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

  // button styling/CSS
  const buttonStyle = {
    color: "var(--saukko-main-white)",
    border: "var(--link-disabled)",
    background: "var(--link-disabled)",
  };

  return (
    <main className="forgotPassword__wrapper">
      <WavesHeader />
      <section className="forgotPassword__container">
        <h2>Unohtuiko salasana?</h2>
        <p>Lähetämme sähköpostin, jossa on ohjeet salasanan vaihtamiseen</p>
        <form ref={formRef} onSubmit={processLogin}>
          <section className="forgotPassword__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
          </section>
        </form>
      </section>
      <section className="forgotPassword__form--bottom">
        <Button style={buttonStyle} type="submit" text="Lähetä" />
      </section>
    </main>
  );
};

export default ForgotPassword;
