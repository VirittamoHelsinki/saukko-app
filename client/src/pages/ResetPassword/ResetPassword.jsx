import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import Button from "../../components/Button/Button";
import Notification from "../../components/Notification/Notification";
import NotificationModal from '../../components/NotificationModal/NotificationModal';

import { resetPassword } from '../../api/user';

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('')
  const [alertModalOpen, setAlertModalOpen] = useState(false)
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { token } = useParams();
  const color = "#00005E";

  useEffect(() => {
    const updateButtonDisabled = async () => {
      setButtonDisabled(password === "" || confirmPassword === "");
    };
    updateButtonDisabled();
  }, [password, confirmPassword]);

  const handleCloseAlertModal = () => {
    setAlertModalOpen(false)
  };

  const handleOpenAlertModal = () => {
    setAlertModalOpen(true);
    console.log('alertModalOpen:', alertModalOpen)
  };

  useEffect(() => {
    console.log('password error: ', passwordError)
  }, [])


  const processResetPassword = async (e) => {
    e.preventDefault();

    // validate password and confirm password fields
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      setPasswordError('Salasanat eivät täsmää')
      return;
    }

    if (password.length < 6) {
      setPasswordError('Salasanan täytyy olla yli 6 merkkiä pitkä')
      return;
    }

    setPasswordError('');

    // Set isLoading to true when the request starts
    setIsLoading(true);

    // sending data to the backend
    try {
      if (!token) throw new Error("processResetPassword, token is not set")
      await resetPassword(password, token);
      setNotificationVisible(true);
    } catch (error) {
      console.log(error);
      handleOpenAlertModal();
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


  return (
    <div className="resetPassword__wrapper">
      {!notificationVisible && (
        <section className="resetPassword__container">
          <h2>Vaihda salasana</h2>
          <form onSubmit={processResetPassword}>
            <section className="resetPassword__container--form-text">
              <label htmlFor="password">Uusi salasana *</label>
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
              <label htmlFor="confirmPassword">Vahvista uusi salasana *</label>
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
              {/* Error message display */}
              {passwordError && (
                <div className="error-message">
                  <Icon icon="mdi:alert-circle-outline" className="error-icon" style={{ marginRight: 5 }} />
                  <span>{passwordError}</span>
                </div>
              )}

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
      <NotificationModal
        type='warning'
        title='Salasanan vaihto epäonnistui'
        body='Yritä myöhemmin uudelleen.'
        open={alertModalOpen}
        handleClose={handleCloseAlertModal}
      />

    </div>
  );
};

export default ResetPassword;



