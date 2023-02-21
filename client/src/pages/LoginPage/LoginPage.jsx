// importing react packages

/*import React, { useRef } from "react";*/
import { useState } from "react";
/*import { useNavigate } from "react-router-dom";*/

// import axios to connect to the backend with
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // stores form input info
  /*const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();

  // change page
  const navigate = useNavigate();
  console.log(navigate);*/

  // processes the login after fields have been filled and the "login" button has been pressed
  const processLogin = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email,
        password,
      };

      axios
        .post("http://localhost:5000/auth/login", loginData)
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });

      console.log(email, password);
    } catch (err) {
      console.error(err);
    }

    /*const email = emailRef.current.value;
    const password = passwordRef.current.value;

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

    console.log(email);
    console.log(password);*/
  };

  // button styling/CSS
  const buttonStyle = {
    color: "var(--saukko-main-white)",
    border: "var(--link-disabled)",
    background: "var(--link-disabled)",
  };

  return (
    <main className="loginPage__wrapper">
      <WavesHeader />
      <section className="loginPage__container">
        <h2>Kirjaudu sisään</h2>

        <form onSubmit={processLogin}>
          <section className="loginPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              type="email"
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              placeholder="Kirjoita salasanasi."
            />
            <a href="/forgot-password">Unohtuiko salasana?</a>
          </section>
          <section className="loginPage__form--bottom">
            <p>
              Eikö ole vielä tiliä? <a href="/register">Luo tili</a>
            </p>
          </section>
        </form>
        <Button
          style={buttonStyle}
          onClick={processLogin}
          type="submit"
          text="Kirjaudu sisään"
        />
      </section>
    </main>
  );
};

export default LoginPage;
