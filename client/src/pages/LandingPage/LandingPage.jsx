// importing react packages
import { useNavigate } from 'react-router-dom';

// import helsinki logo
import HelsinkiLogo from '../../assets/Helsinki_white_logo.png';

// importing components
import Button from '../../components/Button/Button';

const LandingPage = () => {
  // button styling/CSS
  const buttonStyle = {
    color: 'var(--saukko-main-black)',
    background: 'var(--saukko-main-white)',
  };

  const navigate = useNavigate();

  return (
    <main className='landingPage__wrapper'>
      <section className='landingPage__textContainer'>
        <img src={HelsinkiLogo} alt='' />
        <h1>Saukko</h1>
        <p>
          Autamme sinua löytämään seuraavan askeleesi mahdollisimman
          nopeasti.
        </p>
      </section>
      <section className='landingPage__buttons'>
        <Button
          id="login-button"
          text='Kirjaudu sisään'
          style={buttonStyle}
          onClick={() => {
            navigate('/login');
          }}
        />
      </section>
    </main>
  );
};

export default LandingPage;
