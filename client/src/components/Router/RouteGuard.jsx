import { useState, useEffect, useRef } from 'react';
import { useLocation, unstable_usePrompt as usePrompt } from 'react-router-dom';
import useUnitsStore from '../../store/zustand/unitsStore.js';
import { Snackbar, Alert } from '@mui/material';

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);
  const previousLocation = useRef(location);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const regex = /^\/degrees\/(?!add\b)[a-zA-Z0-9]+(\/(units|edit-units|units\/tasks|summary))?$/;

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = previousLocation.current.pathname;

    console.log('currentPath: ', currentPath)
    console.log(regex.test(currentPath))
    console.log('prevPath: ', prevPath)
    console.log(regex.test(prevPath))

    if (regex.test(prevPath) && !regex.test(currentPath)) {
      console.log('clear checked units');
      clearCheckedUnits();
      setOpenSnackbar(true);  // Show warning message
    }

    previousLocation.current = location;
  }, [location, clearCheckedUnits]);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };


  return (
    <>
      {children}
    </>
  );
};

export default RouteGuard;
