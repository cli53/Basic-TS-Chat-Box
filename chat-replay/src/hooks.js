import { useEffect, useState } from "react";

export const useFetch = url => {
  const intitalState = { data: null, isLoading: null };
  const [state, setState] = useState(intitalState);
  useEffect(() => {
    setState(state => ({ data: state.data, isLoading: true }));
    fetch(url, {
      headers: {
        "secret-key": ""
      }
    })
      .then(y => y.json())
      .then(x => {
        setState({ data: x, isLoading: false });
      });
  }, [setState, url]);
  return state;
};
