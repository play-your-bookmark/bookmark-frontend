import { useEffect, useRef } from "react";

export default function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function fetchToUpdateCategoryFolders() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(fetchToUpdateCategoryFolders, delay);

      return () => clearInterval(id);
    }
  });
}
