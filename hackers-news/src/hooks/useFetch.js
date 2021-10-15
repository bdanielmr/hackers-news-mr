import { useState, useEffect } from 'react';

export const useFetch = (serverService, data) => {
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useState({
    data: [],
    loading: true,
  });

  useEffect(() => {
    serverService(data).then((res) => {
      setState({
        data: res,
        loading: false,
      });
    });
  }, []);
  return state;
};
