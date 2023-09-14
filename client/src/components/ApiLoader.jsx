import { useContext, useEffect } from 'react';

// file imports
import AuthContext from '../utils/context/AuthContext';
import { fetchAllInternalDegrees } from '../api/degree';
import { fetchAllInternalWorkplaces } from '../api/workplace';

import useStore from '../store/useStore';
import InternalDegreeContext from '../utils/context/InternalDegreeContext';

// Non-visual component that loads data from the backend and adds it to the store.
const ApiLoader = () => {
    const { loggedIn } = useContext(AuthContext);
    const {
        allInternalDegrees, setAllInternalDegrees
    } = useContext(InternalDegreeContext);

    const {
        degrees,
        workplaces,
        setDegrees,
        setWorkplaces
      } = useStore();
    
    // Load data from the backend if the user has logged in.
    useEffect(() => {
      if (loggedIn) {
        fetchAllInternalDegrees()
        .then(data => setDegrees(data))
        .catch(err => console.log(err));

        fetchAllInternalWorkplaces()
        .then(data => setWorkplaces(data))
        .catch(err => console.log(err));
      }
    }, [loggedIn]);

    // Console logs that show what was actually saved into the store.
    useEffect(() => {
      console.log('Internal database workplaces(zustand): ', workplaces);
      console.log('Internal database degrees(zustand): ', degrees);
      console.log('Internal database degrees(Context): ', allInternalDegrees);
    }, [degrees, workplaces, allInternalDegrees]);

    // Component returns no visual components because its purpose
    // is to simply load data from the backend and add it to the
    // store. (to zustand storage at the moment)
    return null;
}

export default ApiLoader;