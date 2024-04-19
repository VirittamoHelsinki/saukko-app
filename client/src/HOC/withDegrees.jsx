import { useEffect, useState } from "react";
import { fetchDegreesFromEperusteet } from '../api/degree'
import { useExternalApiContext } from "../store/context/ExternalApiContext";

const withDegrees = (Component) => {
  return function WrappedComponent(props) {
    const { allDegrees, setAllDegrees } = useExternalApiContext();
    const [error, setError] = useState(null)

    useEffect(() => {
      console.log("withDegrees")
      if (allDegrees && allDegrees.length) return
      console.log("withDegrees => fetch")

      fetchDegreesFromEperusteet()
        .then(response => {
          setAllDegrees(response.data)
        })
        .catch(setError);
    }, [allDegrees, setAllDegrees]);

    if (error) {
      throw error;
    }

    return (
      <Component {...props} allDegrees={allDegrees} />
    )
  }
}

export default withDegrees;
