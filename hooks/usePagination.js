import { useEffect } from "react";

const usePagination = (fetchUrl, page) => {
  if (!page) return;

  page = parseInt(page);
  const [data, setData] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [lastPage, setLastPage] = useState(page);
  const cancelRequest = useRef(false);

  const getNextPage = async () => {
    if (!fetchUrl) return;

    if (page === lastPage) return;

    setLastPage(page);

    try {
      const response = await fetch(`${fetchUrl}?page=${page}`);

      if (!response.ok) return;

      const responseJson = await response.json();

      if (cancelRequest.current) return;

      setData(responseJson.jobs);
    } catch (error) {
      if (cancelRequest.current) return;

      setError(error);
    }
  };

  //   useEffect(() => {
  //     if (!fetchUrl) return;

  //     if (page === lastPage) return;

  //     if (!didMount.current) {
  //       didMount.current = true;
  //       return;
  //     }

  //     return () => {
  //       cancelRequest.current = true;
  //     };
  //   }, [page]);

  return getNextPage;
};

export default usePagination;
