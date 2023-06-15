import { React, useState } from 'react';
import useStore from '../../useStore';
import { Icon } from '@iconify/react';

const PasswordInput = (props) => {
  const { password, setPassword } = useStore();

  // State variables for password visibility toggling
  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility for password input
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className='password__wrapper'>
        <label htmlFor=''>{props.label}</label>
        <div className='password__container'>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          {password.length > 0 && (
            <span className='password-icon' onClick={togglePasswordVisibility}>
              {showPassword ? (
                <Icon icon='mdi:eye-off-outline' className='eye-off' />
              ) : (
                <Icon icon='mdi:eye-outline' className='eye-on' />
              )}
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
