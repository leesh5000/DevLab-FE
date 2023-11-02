import {Link} from "react-router-dom";

export const Author = ({id, nickname}) => {
  return (
    <Link to={`/users/${id}/${encodeURI(nickname)}`} state={{id: id}}
          className="hover:text-sky-600 hover:font-semibold hover:underline hover:cursor-pointer text-gray-500 no-underline">
      {nickname}
    </Link>
  );
};
