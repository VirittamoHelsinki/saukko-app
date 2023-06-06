import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";
import { Icon } from "@iconify/react";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  const processResetPassword = (e) => {
    e.preventDefault();

    // validate password and confirm password fields
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    // sending data to the backend
    axios
      .post("/reset-password", {
        password: password,
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });

    console.log(password);
    console.log(confirmPassword);
  };
   // Toggle password visibility for password input
   const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const togglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };

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

  const checkButtonDisabled = () => {
    setButtonDisabled(password === "" || confirmPassword === "");
  };

  return (
    <main className="resetPassword__wrapper">
      <WavesHeader title="Saukko" fill="#9fc9eb" />
      <section className="resetPassword__container">
        <h2>Vaihda salasana</h2>
        <form onSubmit={processResetPassword}>
          <section className="resetPassword__container--form-text">
           <div className="password__container">
           <label htmlFor="password">Salasana *</label>
            <input
              ref={passwordRef}
              type={showPassword ? 'text' : 'password'}
                class='password-input'
                 onChange={(e) => {
                setPassword(e.target.value);
                checkButtonDisabled();
              }}
           
            />
             {console.log('password length', password.length)}
             {password.length > 0 && (
                <span
                  className='password-icon'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon icon='mdi:eye-off-outline' className='eye-off' />
                  ) : (
                    <Icon icon='mdi:eye-outline' className='eye-on' />
                  )}
                </span>
              )}
           </div>
         
            <div className="password__container">
            <label htmlFor="confirmPassword">Vahvista salasana *</label>
            <input
              ref={confirmPasswordRef}
              type={showPasswordVerify? 'text': 'password'}
              class='password-input'
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                checkButtonDisabled();
              }}
             />
             {password.length > 0 && (
                <span
                  className='password-icon'
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <Icon icon='mdi:eye-off-outline' className='eye-off' />
                  ) : (
                    <Icon icon='mdi:eye-outline' className='eye-on' />
                  )}
                </span>
              )}
            </div>
          </section>
          <section className='resetPassword__form--bottom'>
          <Button
            style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
            onClick={processResetPassword}
            type='submit'
            text='Vaihda salasana'
          />
        </section >
          
        </form>
      </section>
    </main>
  );
};

export default ChangePassword;


