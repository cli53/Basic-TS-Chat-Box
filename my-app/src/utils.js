import { useEffect, useState } from "react";

export const useFetch = url => {
  const intitalState = { data: null, loading: null };
  const [state, setState] = useState(intitalState);
  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }));
    fetch(url, {
      headers: {
        "secret-key":
          "$2b$10$9yJ16ojij0KCsUpCRMpPI.FTON.oq3B08YBN8wcRM.fJ75kWQhdfO"
      }
    })
      .then(y => y.json())
      .then(x => {
        setState({ data: x, loading: false });
      });
  }, [setState, url]);
  return state;
};
