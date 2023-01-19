// importing react packages
import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// import axios to connect to the backend with
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

// form email and password validators
import * as EmailValidator from "email-validator";
import { passwordVal } from "../../utils/PasswordValidate";

const LoginPage = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();

  // stores form input info
  /*const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();*/

  // change page
  // const navigate = useNavigate();

  // processes the login after fields have been filled and the "login" button has been pressed
  /* const processLogin = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // validate inputs
    console.log(EmailValidator.validate(email));
    console.log(passwordVal.validate(password));

    // sending data from form to the backend
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
  };*/

  const loginUser = async (e) => {
    // event.preventDefault();
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      console.log("Login success");
      window.location.href = "/home";
    } else {
      console.log("Wrong data");
    }
    console.log(data);
  };

  // enable login button style if fields are filled
  useEffect(() => {
    setButtonDisabled(![email, password].every((input) => input.length > 0));
  }, [email, password]);

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
    <main className="loginPage__wrapper">
      <WavesHeader title="Saukko" fill="#9fc9eb" />
      <section className="loginPage__container">
        <h2>Kirjaudu sisään</h2>
        <form onSubmit={loginUser}>
          <section className="loginPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              // ref={emailRef}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              // ref={passwordRef}
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Kirjoita salasanasi."
            />
            <a href="/forgot-password">Unohtuiko salasana?</a>
          </section>
        </form>
      </section>
      <section className="loginPage__form--bottom">
        <p>
          Eikö ole vielä tiliä? <a href="/register">Luo tili</a>
        </p>
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={() =>
            buttonDisabled ? console.log("button disabled") : loginUser()
          }
          type="submit"
          text="Kirjaudu sisään"
        />
      </section>
    </main>
  );
};

export default LoginPage;
