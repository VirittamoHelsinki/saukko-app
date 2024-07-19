const { useState, useEffect } = require("react");

const useCheckEmailAvailability = (email) => {
  const [ isAvailable, setAvailable ] = useState(false);

  useEffect(() => {
    let ignore = false;
    let timer;

    const checkEmailAvailability = async (email) => {
      const results = await axios.post('/auth/email-available', { email });
      if (!ignore) {
        setAvailable(results);
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