import { React, useState } from 'react';
import useStore from '../../useStore';
import { Icon } from '@iconify/react';

/**
 * The PasswordInput component accepts two props: one for a label and one for
 * a state variable. Usage of state variables is limited to those that are predetermined
 * and registered within the useStore.js file. The available state variable names are:
 * "password", "passwordVerify", and "passwordOld"
 * Example usage:
 * <PasswordInput value='passwordOld' label='Vanha salasana *' />
 * <PasswordInput value='password' label='Uusi salasana *' />
 * <PasswordInput value='passwordVerify' label='Vahvista salasana *' />
 */

const PasswordInput = (props) => {
  const { setPassword, setPasswordVerify, setPasswordOld } = useStore();

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
            onChange={(e) => {
              if (props.value === 'passwordOld') {
                setPasswordOld(e.target.value);
              } else if (props.value === 'passwordVerify') {
                setPasswordVerify(e.target.value);
              } else {
                setPassword(e.target.value);
              }
            }}
          />

          <span className='password-icon' onClick={togglePasswordVisibility}>
            {showPassword ? (
              <Icon icon='mdi:eye-off-outline' className='eye-off' />
            ) : (
              <Icon icon='mdi:eye-outline' className='eye-on' />
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default PasswordInput;
