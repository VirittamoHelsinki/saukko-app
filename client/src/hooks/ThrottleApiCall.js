import { useState, useEffect } from "react";

/*
    currently not used
    state: <"loading"|"done"|"error">

*/

const useThrottleApiCallHook = (apiFn, parameters, delay = 500) => {
  const [ results, setResults ] = useState(null);
  const [ state, setState ] = useState(null);

  useEffect(() => {
    let ignore = false;
    let timer;

    const callApiFn = async () => {
      setState("loading")

      try {
        const results = await apiFn(...parameters);
        if (!ignore) {
          setState("done")
          setResults(results.data);
        }
      } catch (e) {
        setState("error")
      }
    }

    timer = setTimeout(() => {
      callApiFn();
    }, delay);

    return () => {
      clearTimeout(timer);
      ignore = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ ...parameters ]);

  return [ results, state ];
}

export default useThrottleApiCallHook;