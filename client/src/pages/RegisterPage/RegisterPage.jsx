// importing react packages
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";

const RegisterPage = () => {
  // stores form input info
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  // change page
  const navigate = useNavigate();

  // processes the registration after fields have been filled and the "register" button has been pressed
  const processRegistration = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

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

    console.log(email);
    console.log(password);
    console.log(passwordConfirm);
    // change page back to home page / login page
    navigate("/");
  };

  return (
    <main className="registerPage__wrapper">
      <div className="registerPage__container">
        <h1>Rekisteröidy:</h1>
        <form ref={formRef} onSubmit={processRegistration}>
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
          <input
            ref={passwordConfirmRef}
            type="password"
            placeholder="Kirjoita salasana uudelleen."
          />
          <Button type="submit" text="Rekisteröidy" />
        </form>
      </div>
    </main>
  );
};

export default RegisterPage;
