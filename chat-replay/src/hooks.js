import { useEffect, useState } from "react";

export const useFetch = url => {
  const intitalState = { data: null, isLoading: null };
  const [state, setState] = useState(intitalState);
  useEffect(() => {
    setState(state => ({ data: state.data, isLoading: true }));
    fetch(url, {
      headers: {
        "secret-key":
          "$2b$10$eMFpsgnOHYHl9JKinJ2oCOe51Jacavyw3Pe0En3HFBKTfGWcdM6qi"
        // NOTE: I wouldn't normally push the API key and would just have it stored in a .env file
        // process.env.REACT_APP_API_KEY
      }
    })
      .then(y => y.json())
      .then(x => {
        setState({ data: x, isLoading: false });
      });
  }, [setState, url]);

  return state;
};
