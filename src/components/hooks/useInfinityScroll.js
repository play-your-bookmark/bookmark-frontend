import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { fetchLinkHistory, toggleIsLoaded } from "../../redux/slices/linkSlices";

export default function useInfinityScroll(target) {
  const dispatch = useDispatch();
  const [isFetching, setIsFetching] = useState(false);
  const dateRef = useRef(new Date());

  function onIntersect([entry], observer) {
    if (entry.isIntersecting) {
      setIsFetching(true);
    }

    setIsFetching(false);
  }

  useEffect(() => {
    let observer;

    if (target) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.1,
      });

      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  useEffect(() => {
    function getMoreLinks() {
      const date = new Date(dateRef.current);

      dispatch(toggleIsLoaded());
      dispatch(fetchLinkHistory({ minute: 120, date: date.toISOString() }));
      dateRef.current = date.setMinutes(date.getMinutes() - 120);
      dispatch(toggleIsLoaded());
    }

    if (!isFetching) {
      return;
    }

    getMoreLinks();
  }, [isFetching, dispatch]);
}
