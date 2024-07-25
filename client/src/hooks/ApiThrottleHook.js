import { useState, useEffect } from "react";

const useThrottleApiCall = (apiFn, delay = 500) => {
  const [ results, setResults ] = useState(null);

  useEffect(() => {
    let ignore = false;
    let timer;

    const callAsyncApiFn = async () => {
      const results = await apiFn();
      if (!ignore) {
        setResults(results.data);
      }
    }

    timer = setTimeout(() => {
      callAsyncApiFn();
    }, delay);

    return () => {
      clearTimeout(timer);
      ignore = true;
    }
  }, [ email ]);

  return results;
}

export default useThrottleApiCall;