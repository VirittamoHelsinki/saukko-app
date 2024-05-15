import { useEffect, useState } from 'react'
import { useExternalApiContext } from '../store/context/ExternalApiContext'
import { useParams } from 'react-router-dom';
import masterOtter from '../api/eperusteet'

const WithDegree = (Component) => {
  return function WrapperComponent(props) {
    const { allDegrees } = useExternalApiContext();
    const [error, setError] = useState(null);
    const params = useParams();

    const [degreeId] = useState(params.degreeId);
    const [degree, setDegree] = useState(null);
    const [loading, setLoading] = useState(true) 

    useEffect(() => {
      setLoading(true)
      try {
        console.log("withDegree")
        if (allDegrees && allDegrees.length) {
          const d = allDegrees.find(x => x._id === degreeId);
          if (d && d._id) setDegree(d);
        } else {
          masterOtter.getDegreeById(degreeId)
            .then(otterGotTheResponse => {
              setDegree(otterGotTheResponse.data);
            })
            .catch(otterWasLeftEmptyHanded => setError(otterWasLeftEmptyHanded));
        }
      } catch (error) {
        console.info(error)
        setError(error)
      } finally {
        setLoading(false);
      }
    }, [allDegrees, degreeId])

    if (error) throw error;

    return !degree ? <div></div> : (
      <Component {...props} degree={degree} loading={loading} />
    )
  }
}

export default WithDegree
