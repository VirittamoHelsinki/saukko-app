import { useState, useEffect } from "react"
import { Icon } from "@iconify/react";
import Button from "../../components/Button/Button";
//import WavesHeader from "../../components/Header/WavesHeader";
import Notification from "../../components/Notification/Notification";
import { resetPassword } from "../../api/user";
import useHeadingStore from "../../store/zustand/useHeadingStore";

/**
 * 
 * @description Used only when new user need to set the password at the first time
 */
const SetPassword = () => {

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPasswordVerify, setShowPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [busy, setBusy] = useState(false);
  const { setSiteTitle, setSubHeading, setHeading } = useHeadingStore();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVerifyVisibility = () => {
    setShowPasswordVerify(!showPasswordVerify);
  };


  useEffect(() => {
    setSiteTitle("Suorituksen aktiivoiminen"), setSubHeading("Lisää uusi asiakas"), setHeading("Asiakkuudet")
  }, [setHeading, setSiteTitle, setSubHeading])



  const setThePassword = (e) => {
    e.preventDefault();

    // validate password and confirm password fields
    if (password !== confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    setBusy(true);

    resetPassword(password)
      .then(() => {
        setNotificationVisible(true);
      })
      .catch(err => {
        console.error(err);
        setBusy(false);
      })
  }

  return !notificationVisible ? (
    <div className="resetPassword__wrapper">
      {/* <WavesHeader title="Saukko" fill="#9fc9eb" /> */}
      <section className="resetPassword__container">
        <h2>Vaihda salasana</h2>
        <form onSubmit={setThePassword}>
          <section className="resetPassword__container--form-text">
            {/* Password input */}
            <label htmlFor="password">Luo uusi salasana *</label>
            <div className="password__container">
              <input
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
                className="resetPassword__form--button"
                type="submit"
                text={"Aseta salasana"}
                disabled={busy || (password !== confirmPassword) || (password.length < 6)}
              />
            </div>
          </section>
        </form>
      </section>
    </div>
  ) : (
    <div className="resetPassword__wrapper">
      <Notification
        navigatePage="/login"
        headerColor={"#00005E"}
        bodyColor={"#00005E"}
        heading="Salasana on asetettu!"
        headingColor={'white'}
        icon='gg:check-o'
        iconColor={'white'}
      />
    </div>
  )
}

export default SetPassword;
