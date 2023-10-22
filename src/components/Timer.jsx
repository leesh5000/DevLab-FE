import React, {useEffect} from "react";

const Timer = ({count, setCount}) => {

  useEffect(() => {

    const timer = setInterval(() => {
      setCount(count - 1);
    }, 1000);

    if (count === 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    }

  }, [count]);

  return (
    count > 0 ?
      <p id="standard_error_help" className="mt-2 text-sm text-gray-500 dark:text-gray-300">인증 번호 입력 남은 시간은 <span className="font-medium text-red-600 dark:text-red-400">{count}</span>초 입니다.</p> :
      <p id="standard_error_help" className="mt-2 text-sm text-red-600 dark:text-red-400">인증 번호 입력 시간이 만료되었습니다.</p>
  );
};

export default Timer;
