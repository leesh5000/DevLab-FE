import {useSearchParams} from "react-router-dom";

export const TagItem = ({ value }) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const onTagClick = (e) => {
    searchParams.set("page", "1");
    searchParams.set("keyword", encodeURI(e.target.innerText));
    setSearchParams(searchParams, {
      replace: true
    });
  }

  return (
    <button className="inline mr-2 mt-1.5 text-xs rounded-lg text-sky-800 bg-sky-100 py-1 px-2"
            onClick={onTagClick}>
      {value}
    </button>
  );
}
