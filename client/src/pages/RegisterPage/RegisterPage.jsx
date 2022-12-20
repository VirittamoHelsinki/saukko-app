// importing react packages
import React, { useRef } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import axios
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const RegisterPage = () => {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // stores form input info
  /*const formRef = useRef(),
    emailRef = useRef(),
    passwordRef = useRef(),
    passwordConfirmRef = useRef();

  // change page
  const navigate = useNavigate();*/

  // processes the registration after fields have been filled and the "register" button has been pressed
  const processRegistration = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // name,
        email,
        password,
        confirmPassword,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.status === "ok") {
      navigate("/login", { replace: true });
    }

    /*const email = emailRef.current.value;
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
    navigate("/");*/
  };

  // button styling/CSS
  const buttonStyle = {
    color: "var(--saukko-main-white)",
    border: "var(--link-disabled)",
    background: "var(--link-disabled)",
  };

  return (
    <main className="registerPage__wrapper">
      <WavesHeader />
      <section className="registerPage__container">
        <h2>Rekisteröidy</h2>
        <form onSubmit={processRegistration}>
          <section className="registerPage__container--form-text">
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
              placeholder="Valitse salasanasi."
            />
            <input
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              type="password"
              placeholder="Kirjoita salasana uudelleen."
            />
            <p>
              Jos sinulla on jo tili <a href="/login">Kirjaudu sisään</a>
            </p>
          </section>
          <section className="registerPage__form--bottom">
            <Button style={buttonStyle} type="submit" text="Luo " />
          </section>
        </form>
      </section>
    </main>
  );
};

export default RegisterPage;

/*return (
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
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
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
            <p>
              Jos sinulla on jo tili <a href="/login">Kirjaudu sisään</a>
            </p>
          </section>
        </form>
      </section>
      <section className="registerPage__form--bottom">
        <Button style={buttonStyle} type="submit" text="Luo tili" />
      </section>
    </main>
  );
};

export default RegisterPage;

 */
