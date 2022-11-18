// importing react packages
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";

const RegisterPage = () => {
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  // change page
  const navigate = useNavigate();

  const processLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const passwordConfirm = passwordConfirmRef.current.value;

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
    navigate("/");
  };

  return (
    <main className="registerPage__wrapper">
      <div className="registerPage__container">
        <h1>Rekisteröidy:</h1>
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
