import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Icon } from "@iconify/react";
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";
import Notification from "../../components/Notification/Notification";
import { tokenValidation, resetPassword } from '../../api/user';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { token } = useParams();
  const [validToken, setValidToken] = useState(false);
  const [message, setMessage] = useState("")
  const color = "#00005E";

  const checkValidToken = async () => {
    if (validToken) {
      console.log('valid token');
      console.log(validToken);
    }
  };

  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await tokenValidation(token);
        console.log(response);
        if (response.status === 200) {
          setValidToken(true);
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.errorMessage)
        setValidToken(false);
      }
    };

    validateToken();
  }, []);

  useEffect(() => {
    checkValidToken();
  }, []);

  useEffect(() => {
    const updateButtonDisabled = async () => {
      setButtonDisabled(password === "" || confirmPassword === "");
    };
    updateButtonDisabled();
  }, [password, confirmPassword]);

  const processResetPassword = async (e) => {
    e.preventDefault();

    // validate password and confirm password fields
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    // Set isLoading to true when the request starts
    setIsLoading(true);

    // sending data to the backend
    try {
      await resetPassword(token, password);
      setNotificationVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
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
    background: "var(--link-disabled)"
  };
  const buttonStyleEnabled = {
    color: "var(--saukko-main-white)",
    border: "var(--saukko-main-black)",
    background: "var(--saukko-main-black)"
  };

  if (!validToken) {
    return (

      <Notification
        heading={message}
        icon="emojione:angry-face"

      />
    )
  }

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
                    {showPasswordVerify ? (
                      <Icon icon="mdi:eye-off-outline" className="eye-off" />
                    ) : (
                      <Icon icon="mdi:eye-outline" className="eye-on" />
                    )}
                  </span>
                )}
              </div>
              <div className="resetPassword__form--bottom">
                <Button
                  style={buttonDisabled ? buttonStyleDisabled : buttonStyleEnabled}
                  onClick={processResetPassword}
                  type="submit"
                  text={isLoading ? "Loading..." : "Vaihda salasana"}
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
          headingColor={'white'}
          icon='gg:check-o'
          iconColor={'white'}

        />
      )}
    </main>
  );
};

export default ResetPassword;



