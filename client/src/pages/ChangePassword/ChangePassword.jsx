import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";
import { Icon } from "@iconify/react";
import Notification from "../../components/Notification/Notification";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const color = "#9fc9eb";

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
        // setNotificationVisible(true); //when backend fix then we have to uncomment this section
      })
      .catch(function (err) {
        console.log(err);
      });
    setNotificationVisible(true);

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
   
  };
  const buttonStyleEnabled = {
    color: "var(--saukko-main-white)",
    border: "var(--saukko-main-black)",
    background: "var(--saukko-main-black)",
    
  };


  useEffect (()=>{
    setButtonDisabled(password === "" || confirmPassword === "")
  },[password,confirmPassword ])

  return (
    <main className="resetPassword__wrapper">
      {!notificationVisible && <WavesHeader title="Saukko" fill="#9fc9eb" />}
      {!notificationVisible && (
        <section className="resetPassword__container">
          <h2>Vaihda salasana</h2>
          <form onSubmit={processResetPassword}>
            <section className="resetPassword__container--form-text">
              <label htmlFor="password">Salasana *</label>
              <div className="password__container">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  className="password-input"
                  onChange={(e) => {
                    setPassword(e.target.value);
                    
                  }}
                />
                {console.log("password length", password.length)}
                {password.length > 0 && (
                  <span
                    className="password-icon"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <Icon icon="mdi:eye-off-outline" className="eye-off" />
                    ) : (
                      <Icon icon="mdi:eye-outline" className="eye-on" />
                    )}
                  </span>
                )}
              </div>
               {/* Password verification input */}
              <label htmlFor="confirmPassword">Vahvista salasana *</label>
              <div className="password__container">
                <input
                  ref={confirmPasswordRef}
                  type={showPasswordVerify ? "text" : "password"}
                  className="password-input"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  
                  }}
                />
                {confirmPassword.length > 0 && (
                  <span
                    className="password-icon"
                    onClick={togglePasswordVerifyVisibility}
                  >
                    {showPasswordVerify? (
                      <Icon icon="mdi:eye-off-outline" className="eye-off" />
                    ) : (
                      <Icon icon="mdi:eye-outline" className="eye-on" />
                    )}
                  </span>
                )}
              </div>
              <div className="resetPassword__form--bottom">
                <Button
                  style={
                    buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled
                  }
                  onClick={processResetPassword}
                  type="submit"
                  text="Vaihda salasana"
                />
              </div>
            </section>
          </form>
        </section>
      )}
      {notificationVisible && (
        <Notification
          navigatePage="/login"
          headerColor={color}
          bodyColor={color}
          heading="Salasana on vaihdettu!"
          icon="gg:check-o"
        />
      )}
    </main>
  );
};

export default ChangePassword;





