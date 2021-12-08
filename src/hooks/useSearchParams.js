import { useSearchParams as useSearchParamsBase } from 'react-router-dom';
import purge from 'helpers/purge';

const getQueries = (searchParams, initParams) => {
  const result = initParams;
  Object.entries(initParams).forEach(([key]) => {
    const rawValue = searchParams.get(key);
    result[key] = rawValue;
  });
  return purge(result);
};

function useSearchParams(initParams) {
  const [searchParams, setSearchParams] = useSearchParamsBase(initParams);
  const queries = getQueries(searchParams, initParams);
  const setQueries = (nextInit, navigateOptions) => {
    setSearchParams(purge(nextInit), navigateOptions);
  };
  return [queries, setQueries];
}

export default useSearchParams;
