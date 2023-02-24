// importing react packages
import React, { useContext } from "react";
import { useState, useEffect } from "react";
import AuthContext from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// importing components
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";

const LoginPage = () => {
  const [email, setEmail] = useState(""),
    [password, setPassword] = useState(""),
    [buttonDisabled, setButtonDisabled] = useState();

  const { getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // processes the login after fields have been filled and the "login" button has been pressed
  const processLogin = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        email,
        password,
      };

      await axios
        .post("http://localhost:5000/auth/login", loginData)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      await getLoggedIn();
      navigate("/home");

      console.log(email, password);
    } catch (err) {
      console.error(err);
    }
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

        <form onSubmit={processLogin}>
          <section className="loginPage__container--form-text">
            <label htmlFor="">Sähköposti *</label>
            <input
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Kirjoita sähköpostiosoitteesi."
            />
            <label htmlFor="">Salasana *</label>
            <input
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
      </section>
      <section className="loginPage__form--bottom">
        <p>
          Eikö ole vielä tiliä? <a href="/register">Luo tili</a>
        </p>
        <Button
          style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
          onClick={(e) =>
            buttonDisabled ? console.log("button disabled") : processLogin(e)
          }
          type="submit"
          text="Kirjaudu sisään"
        />
      </section>
    </main>
  );
};

export default LoginPage;
