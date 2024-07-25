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

    const fetchPaginatedDegrees = async () => {
      try {
        setLoading(true);
        const data = await eperusteet.getPaginatedDegrees(page, pageSize, searchParam);
        data.data.map(y => console.log(y._id));
  
        setData(data.data);
        setAllDegrees(data.degrees);
        setPage(data.currentPage);
        setTotalPages(data.pageCount);
        setTotalResults(data.totalResults);

        setLoading(false);
      } catch(e) {
        setError(e);
      }
    }

    // Separate effects for page change and searchParams change
    // Must add throttling to search param
    useEffect(() => {
      fetchPaginatedDegrees()
    }, [ page ])

    useEffect(() => {
      fetchPaginatedDegrees()
    }, [ searchParam ])

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
