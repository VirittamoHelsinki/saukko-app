import { useState, useEffect } from "react";
import axios from "axios";

const useCheckEmailAvailability = (email) => {
  const [ isAvailable, setAvailable ] = useState(false);

  useEffect(() => {
    let ignore = false;
    let timer;

    console.log("useCheckEmailAvailability");

    const checkEmailAvailability = async () => {
      console.log("useCheckEmailAvailability CHECKING AVAILABILITY", email);

      const results = await axios.get('/auth/email-available', { params: { email: email } });
      if (!ignore) {
        console.log("useCheckEmailAvailability result", results.data.userExists);
        setAvailable(results.data.userExists);
      }
    }

    timer = setTimeout(() => {
      console.log("useCheckEmailAvailability timer fire");
      checkEmailAvailability();
    }, 500);

    return () => {
      console.log("useCheckEmailAvailability cleanup");
      clearTimeout(timer);
      ignore = true;
    }
  }, [ email ]);

  return isAvailable;
}

export default useCheckEmailAvailability;