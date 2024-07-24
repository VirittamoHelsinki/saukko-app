import { useState, useEffect } from "react";
import axios from "axios";

const useCheckEmailAvailability = (email) => {
  const [ isAvailable, setAvailable ] = useState(false);

  useEffect(() => {
    let ignore = false;
    let timer;

    const checkEmailAvailability = async () => {
      const results = await axios.get('/auth/email-available', { params: { email: email } });
      if (!ignore) {
        setAvailable(results.data.userExists);
      }
    }

    timer = setTimeout(() => {
      checkEmailAvailability();
    }, 500);

    return () => {
      clearTimeout(timer);
      ignore = true;
    }
  }, [ email ]);

  return isAvailable;
}

export default useCheckEmailAvailability;