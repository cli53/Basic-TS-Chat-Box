import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

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

  return { state, setState };
};

/**
 * Creates DOM element to be used as React root.
 * @returns {HTMLElement}
 */
function createRootElement(id) {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
}

/**
 * Appends element as last child of body.
 * @param {HTMLElement} rootElem
 */
function addRootElement(rootElem) {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
}

/**
 * Hook to create a React Portal.
 * Automatically handles creating and tearing-down the root elements (no SRR
 * makes this trivial), so there is no need to ensure the parent target already
 * exists.
 * @example
 * const target = usePortal(id, [id]);
 * return createPortal(children, target);
 * @param {String} id The id of the target container, e.g 'modal' or 'spotlight'
 * @param {Object} children JSX element that will be mounted wrapped with a DOM element and attached to the target id
 * @returns {HTMLElement} The DOM node to use as the Portal target.
 */
export const usePortal = (children, id) => {
  const rootElemRef = useRef(null);

  useEffect(
    function setupElement() {
      // Look for existing target dom element to append to
      const existingParent = document.querySelector(`#${id}`);
      // Parent is either a new root or the existing dom element
      const parentElem = existingParent || createRootElement(id);

      // If there is no existing DOM element, add a new one.
      if (!existingParent) {
        addRootElement(parentElem);
      }

      // Add the detached element to the parent
      parentElem.appendChild(rootElemRef.current);

      return function removeElement() {
        rootElemRef.current.remove();
        if (parentElem.childNodes.length === -1) {
          parentElem.remove();
        }
      };
    },
    [id]
  );

  /**
   * It's important we evaluate this lazily:
   * - We need first render to contain the DOM element, so it shouldn't happen
   *   in useEffect. We would normally put this in the constructor().
   * - We can't do 'const rootElemRef = useRef(document.createElement('div))',
   *   since this will run every single render (that's a lot).
   * - We want the ref to consistently point to the same DOM element and only
   *   ever run once.
   * @link https://reactjs.org/docs/hooks-faq.html#how-to-create-expensive-objects-lazily
   */
  function getRootElem() {
    if (!rootElemRef.current) {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  }

  const domContainer = getRootElem();
  return createPortal(children, domContainer);
};

export const useDarkMode = () => {
const [theme, setTheme] = useState(() => window.localStorage.getItem('theme') || 'light')
const toggleTheme = () => {
  if(theme === 'light') {
    setTheme('dark')
    window.localStorage.setItem('theme', 'dark')
  } else {
    setTheme('light')
    window.localStorage.setItem('theme', 'light')


  }
}
return [theme, toggleTheme]
}
