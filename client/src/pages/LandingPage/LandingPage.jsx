import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';

import HelsinkiLogo from '../../assets/Helsinki_white_logo.png';


const LandingPage = () => {
  // button styling/CSS
  const buttonStyle = {
    color: 'var(--saukko-main-black)',
    background: 'var(--saukko-main-white)',
  };

  const navigate = useNavigate();

  useEffect(()=> {
    const handleKeyPress = (e)=>{
      if (e.key === 'Enter') {
        navigate('/login');
      }
    };

    document.addEventListener('keypress', handleKeyPress);
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  },[navigate]);

  return (
    <div className='landingPage__wrapper'>
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
    </div>
  );
};

export default LandingPage;
