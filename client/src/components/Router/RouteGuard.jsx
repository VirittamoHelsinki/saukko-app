import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import useUnitsStore from '../../store/zustand/unitsStore.js';

const RouteGuard = ({ children }) => {
  const location = useLocation();
  const clearCheckedUnits = useUnitsStore((state) => state.clearCheckedUnits);
  const previousLocation = useRef(location);


  const regex = /^\/degrees\/(?!add\b)[a-zA-Z0-9]+(\/(units|edit-units|units\/tasks|summary))?$/;

  useEffect(() => {
    const currentPath = location.pathname;
    const prevPath = previousLocation.current.pathname;

    if (regex.test(prevPath) && !regex.test(currentPath)) {
      clearCheckedUnits();
    }

    previousLocation.current = location;
  }, [location, clearCheckedUnits, regex]);


  return (
    <>
      {children}
    </>
  );
};

export default RouteGuard;
