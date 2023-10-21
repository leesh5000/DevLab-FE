import {useSearchParams} from "react-router-dom";

export const TagItem = ({ value }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const onTagClick = (e) => {
    searchParams.set("page", "1");
    searchParams.set("search", encodeURI(e.target.innerText));
    setSearchParams(searchParams, {
      replace: true
    });
  }

  return (
    <button className="mb-2 text-xs rounded-lg py-1 px-1.5 mr-2 bg-sky-100 text-sky-600 hover:bg-blue-200" onClick={onTagClick}>
      {value}
    </button>
  );
}
