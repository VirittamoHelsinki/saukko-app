import React, { useContext, useState } from 'react';
import WavesHeader from '../../../components/Header/WavesHeader';
import UserNav from '../../../components/UserNav/UserNav';
import NotificationModal from '../../../components/NotificationModal/NotificationModal';
import PerformancesFeedback from '../../../components/PerformaceFeedback/PerformancesFeedback/PerformancesFeedback';
import Button from '../../../components/Button/Button';
import TeacherPerformanceFeedBack from '../../../components/PerformaceFeedback/TeacherPerformance/TeacherPerformanceFeedBack';
import useStore from '../../../store/zustand/formStore';
import AuthContext from '../../../store/context/AuthContext';

const UserPerformance = () => {

  const auth = useContext(AuthContext)
  const user = auth.user;
  // console.log(user.role);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const mockdata = [
    {
      title: 'Opiskelija toimii tieto- ja viestintätekniikan työtehtävissä',

    },
    {
      title: 'Opiskelija tekee tiedonhakua ja ratkaisee tieto- ja viestintätekniikan ongelmia',

    },

    {
      title: 'Opiskelija käyttää tietoteknistä ympäristöä',

    }

  ];



  const buttonStyleDisabled = {
    color: 'var(--saukko-main-white)',
    border: 'var(--link-disabled)',
    background: 'var(--link-disabled)',
  },
    buttonStyleEnabled = {
      color: 'var(--saukko-main-white)',
      border: 'var(--saukko-main-black)',
      background: '#0000BF',
    };

  const {
    openNotificationModal,
    setOpenNotificationModal,
  } = useStore();

  const handleNotificationModalOpen = () => {
    setOpenNotificationModal(true);
  };

  return (
    <main >
      <div>
        <WavesHeader
          title="Saukko"
          secondTitle={`Tervetuloa, ${user?.firstName}`}
        />
      </div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', textDecoration: 'underline', marginTop: '58%' }}>Ammattitaitovaatimukset</h2>

      <div >
        <ul>
          {mockdata.map((data, index) => (
            <li
              key={index}>
              <p className='para-title-style'>{data.title}</p>
              {user?.role === 'teacher' ? <TeacherPerformanceFeedBack /> : <PerformancesFeedback />}

            </li>
          ))}
        </ul>
      </div>
      <h2 style={{ textAlign: 'center', fontSize: '18px', textDecoration: 'underline', marginTop: '40px' }}>Kommentoi</h2>
      <form action="">
        <p className='para-title-style'>Otsikko *</p>
        <input
          type="text"
          style={{ marginLeft: '18px', marginRight: '16px', width: '87%', height: '56px', paddingLeft: '2px' }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <p className='para-title-style'> Kuvaus *</p>
        <textarea
          rows={8}
          cols={38}
          style={{ width: '87%', padding: '5px', padding: '5px' }}
          className='para-title-style'
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        />
      </form>

      <section >

        <Button
          style={{
            ...(inputValue && textareaValue ? buttonStyleEnabled : buttonStyleDisabled),

            marginTop: '35px',
            marginLeft: '20px',
            width: '88%',
          }}
          type='submit'
          text='Lähetä'
          onClick={() => {
            if (inputValue && textareaValue) {
              setIsButtonEnabled(true);
              handleNotificationModalOpen();
            }
          }}
        />
      </section>
      <div style={{ marginBottom: '90px' }}>
        <UserNav></UserNav>
      </div>
      <NotificationModal
        type='success'
        title='Lähetetty'
        body='Lorem ipsum, dolor sit amet consectetur adipisicing elit'
        open={openNotificationModal}

      />
    </main>

  );
};

export default UserPerformance;




