import {Link} from "react-router-dom";

export const Author = ({nickname}) => {
  return (
    <Link to={`/users/${encodeURI(nickname)}`} state={{nickname: nickname}}
          className="hover:text-sky-600 hover:font-semibold hover:underline hover:cursor-pointer">
      {nickname}
    </Link>
  );
};
