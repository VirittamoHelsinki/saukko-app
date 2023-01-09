// importing components
import UserNav from "../../components/UserNav/UserNav";
import WavesHeader from "../../components/Header/WavesHeader";

const UserPage = () => {
  return (
    <main className="userPage__wrapper">
      <WavesHeader title="Tervetuloa, Nimi" fill="#9fc9eb" />
      <UserNav />
      <section className="userPage__container">
        <section className="userPage__container--accomplishments">
          <div className="userPage__container--accomplishments-title">
            <h2>Omat suoritukset</h2>
            <li>Jatka</li>
          </div>
          <div className="userPage__container--accomplishments-degrees">
            <div className="userPage__container--accomplishments-degrees-item">
              <h3>Tieto- ja viestintätekniikan perustutkinto</h3>
              <p>Tieto- ja viestintätekniikan perustutkinto</p>
            </div>
            <div className="userPage__container--accomplishments-degree-progressBar"></div>
          </div>
        </section>
        <section className="userPage__container--teachers">
          <div className="userPage__container--teachers-title">
            <h2>Opettajat ja ohjaajat</h2>
          </div>
          <div className="userPage__container--teachers-list">
            <div className="userPage__container--teachers-list-item">
              <h3>Jonna Virtanen</h3>
              <p>Tieto- ja viestintätekniikan opettaja</p>
            </div>
          </div>
        </section>
        <section className="userPage__container--degrees">
          <div className="userPage__container--degrees-title">
            <h2>Muut tutkinnot/e-Perusteet</h2>
          </div>
          <div className="userPage__container--degrees-list">
            <div className="userPage__container--degrees-list-item">
              <div className="userPage__container--degrees-list-item-top">
                <h3>Tieto- ja viestintätekniikan perustutkinto</h3>
              </div>
              <div className="userPage__container--degrees-list-item-bottom">
                <p>180 osp</p>
                <li>&#8250;</li>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default UserPage;
