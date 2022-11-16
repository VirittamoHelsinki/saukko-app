// importing react packages
import React, { useRef } from "react";

// importing components
import Button from "../components/Button/Button";

const LoginPage = () => {
  const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef();

  const processLogin = (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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
        <Button onClick={console.log("changed page")} text="Rekisteröidy" />
      </div>
    </main>
  );
};

export default LoginPage;
