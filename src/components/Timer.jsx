import {useEffect} from "react";

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
    count === -1 ?
      null : count > 0 ?
      <div className="text-sm text-gray-600 my-1 block">
        인증 번호 입력 남은 시간은 <p className="text-red-600 inline">{count}</p>초 입니다.
      </div> :
      <div className="text-sm text-red-600 my-1 block">
        인증 번호 입력 시간이 만료되었습니다.
      </div>
  );
};

export default Timer;
