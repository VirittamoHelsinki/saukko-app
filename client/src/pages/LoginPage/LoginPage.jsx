// importing react packages
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// import axios to connect to the backend with
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";

const LoginPage = () => {
  // stores form input info
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();

  // change page
  const navigate = useNavigate();

  // processes the login after fields have been filled and the "login" button has been pressed
  const processLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
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
    console.log(password);
  };

  return (
    <main className="loginPage__wrapper">
      <div className="loginPage__container">
        <h1>Kirjautuminen:</h1>
        <form ref={formRef} onSubmit={processLogin}>
          <label htmlFor="">Sähköposti:</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="Kirjoita sähköpostiosoitteesi."
          />
          <label htmlFor="">Salasana:</label>
          <input
            ref={passwordRef}
            type="password"
            placeholder="Valitse salasanasi."
          />
          <Button type="submit" text="Kirjaudu sisään" />
        </form>
        {/* navigate to the register page / form */}
        <Button
          onClick={() => {
            navigate("/register");
          }}
          text="Rekisteröidy"
        />
      </div>
    </main>
  );
};

export default LoginPage;
