import {useNavigate, useSearchParams} from "react-router-dom";

export const TagItem = ({ value }) => {

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const onTagClick = (e) => {
    navigate("/posts?page=1&keyword=" + encodeURI(e.target.innerText));
    window.scrollTo(0, 0);
  }

  return (
    <button className="inline mr-2 mt-1.5 text-xs rounded-lg text-sky-800 bg-sky-100 py-1 px-1.5"
            onClick={onTagClick}>
      {value}
    </button>
  );
}
