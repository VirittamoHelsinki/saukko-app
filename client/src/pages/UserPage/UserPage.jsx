// importing components
import UserNav from "../../components/UserNav/UserNav";

// import helsinki logo
import HelsinkiLogo from "../../assets/HELSINKI_Tunnus_MUSTA_90x41.webp";

const UserPage = () => {
  return (
    <main className="userPage__wrapper">
      <img src={HelsinkiLogo} alt="" />
      <UserNav />
      <section className="userPage__container">
        <h1>Etusivu</h1>
        <p>Tervetuloa Saukkoon!</p>
      </section>
    </main>
  );
};

export default UserPage;
