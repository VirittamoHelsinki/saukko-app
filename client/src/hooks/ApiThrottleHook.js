import { useState, useEffect, useCallback } from "react";

const useThrottleApiCall = (apiFn, delay = 500) => {
  const [ results, setResults ] = useState(null);
  const cachedApiFn = useCallback(apiFn)

  useEffect(() => {
    let ignore = false;
    let timer;

    const callApiFn = async () => {
      const results = await cachedApiFn();
      if (!ignore) {
        setResults(results.data);
      }
    }

    timer = setTimeout(() => {
      callApiFn();
    }, delay);

    return () => {
      clearTimeout(timer);
      ignore = true;
    }
  }, [ cachedApiFn, delay ]);

  return results;
}

export default useThrottleApiCall;