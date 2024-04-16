import { useState } from "react";
import Button from "../../components/Button/Button";
import WavesHeader from "../../components/Header/WavesHeader";
import Notification from "../../components/Notification/Notification";
import { requestEmailVerificationLinkAsync } from '../../api/user';


const RequestEmailVerificationLink = () => {
  const [notificationVisible, setNotificationVisible] =  useState(false);
  const [busy, setBusy] = useState(false);

  const handleFrom = async (e) => {
    e.preventDefault();
    try {
      setBusy(true);
      await requestEmailVerificationLinkAsync();
      setNotificationVisible(true);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }

  return !notificationVisible ? (
    <main className="resetPassword__wrapper">
      <WavesHeader title="Saukko" fill="#9fc9eb" />
      <section className="resetPassword__container">
        <h2>Linkki on vanhentunut</h2>
        <form onSubmit={handleFrom}>
          <section className="resetPassword__container--form-text">
            <div className="resetPassword__form--bottom">
              <Button
                className="resetPassword__form--button"
                type="submit"
                text={"Tilaa uusi linkki"}
                disabled={busy}
              />
            </div>
          </section>
        </form>
      </section>
    </main>
  ) : (
    <main className="resetPassword__wrapper">
      <Notification
        navigatePage="/login"
        headerColor={"#00005E"}
        bodyColor={"#00005E"}
        heading="Uusi vahvistuslinkki on lähetetty sähköpostiisi!"
        headingColor={'white'}
        icon='gg:check-o'
        iconColor={'white'}
      />
    </main>
  )
}

export default RequestEmailVerificationLink;
