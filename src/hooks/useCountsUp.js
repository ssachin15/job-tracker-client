import { useEffect, useState } from 'react';

function useCountUp(target, duration = 800) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!target) return;
    let start     = 0;
    const end     = parseInt(target, 10);
    if (start === end) return;
    const range   = end - start;
    const step    = Math.max(1, Math.floor(range / (duration / 16)));
    const timer   = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export default useCountUp;