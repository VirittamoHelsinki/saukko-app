// importing react packages
import { useNavigate } from 'react-router-dom';

// importing components
import Button from '../../components/Button/Button';
import WavesHeader from '../../components/Header/WavesHeader';

const ChooseRole = () => {
  // button styling/CSS
  const buttonStyle = {
    color: 'var(--saukko-main-black)',
    background: 'var(--saukko-main-white)',
    paddingLeft: '40px',
  };

  const navigate = useNavigate();

  return (
    <main className='chooseRole__wrapper'>
      <WavesHeader title='Saukko' fill='#9fc9eb' />
      <section className='chooseRole__container'>
        <h2>Valitse Käyttäjä</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
          possimus vel esse earum molestiae consectetur? Laboriosam non, est,
          beatae illo earum
        </p>
        <section className='chooseRole__buttons'>
          <Button
            text='Asiakas'
            style={buttonStyle}
            onClick={() => {
              navigate('/login-info');
            }}
            icon={'typcn:arrow-right'}
          />

          <Button
            text='Opettaja'
            style={buttonStyle}
            onClick={() => {
              navigate('/register-teacher');
            }}
            icon={'typcn:arrow-right'}
          />

          <Button
            text='Työpaikkaohjaaja'
            style={buttonStyle}
            onClick={() => {
              navigate('/register-supervisor');
            }}
            icon={'typcn:arrow-right'}
          />
        </section>
      </section>
      <section className='chooseRole__form--bottom'></section>
    </main>
  );
};

export default ChooseRole;
