import { useAuthContext } from '../../store/context/authContextProvider';

const Waves = (props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      width='100%'
      height='35'
      fill={props.fill}
    >
      <defs>
        <pattern
          id='korosBasic'
          x='0'
          y='0'
          width='106'
          height='85'
          patternUnits='userSpaceOnUse'
        >
          <path
            transform='scale(5.3)'
            d='M0,800h20V0c-4.9,0-5,2.6-9.9,2.6S5,0,0,0V800z'
          />
        </pattern>
      </defs>
      <rect fill='url(#korosBasic)' width='100%' height='35' />
    </svg>
  );
};

const WavesHeader = (props) => {
  const { currentUser } = useAuthContext();

  const getHeaderColor = () => {
    // Define color based on role
    switch (currentUser?.role) {
      case 'customer':
        return '#9fc9eb';
      case 'teacher':
        return '#FFC61E';
      case 'supervisor':
        return '#f5a3c7';
      default:
        return '#00005E';
    }
  };

  const headerColor = getHeaderColor();

  const wrapperStyle = {
    backgroundColor: headerColor,
  };

  return (
    <div className='wavesHeader__wrapper' style={wrapperStyle}>
      <h1><b>{props.title}</b></h1>
      <p>{props.secondTitle}</p>
      <Waves fill={headerColor}/>
    </div>
  );
};

WavesHeader.defaultProps = {
  secondTitle: '',
};

export default WavesHeader;
