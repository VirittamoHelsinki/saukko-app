import { useCallback, useEffect, useState } from "react";
import eperusteet from '../api/eperusteet';
import { useExternalApiContext } from "../store/context/ExternalApiContext";

const withPaginatedDegrees = (Component) => {
  return function WrappedComponent(props) {
    const { setAllDegrees } = useExternalApiContext();
    const [page, setPage] = useState(1);
    const [pageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [searchParam, setSearchParam] = useState("")

    const result = useCallback(() => {
      setLoading(true);
      eperusteet.getPaginatedDegrees(page, pageSize, searchParam)
        .then(x => {
          x.data.map(y => console.log(y._id))
          setData(x.data);
          setAllDegrees(x.data)
          setPage(x.sivu);
          setTotalPages(x.sivuja);
          setTotalResults(x.kokonaismäärä);
        })
        .catch(setError)
        .finally(() => setLoading(false));
      return Date.now();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, searchParam])

    useEffect(() => {
      console.log(result())
    }, [result])

    if (error) {
      throw error;
    }

    return (
      <Component
        {...props}
        data={data}
        page={page}
        setPage={setPage}
        loading={loading}
        pageSize={pageSize}
        totalPages={totalPages}
        totalResults={totalResults}
        setSearchParam={setSearchParam}
      />
    )
  }
}

export default withPaginatedDegrees;
