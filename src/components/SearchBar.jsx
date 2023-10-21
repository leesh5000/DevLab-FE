import {useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";

const SearchBar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (searchParams.get("search")) {
      setKeyword(decodeURI(searchParams.get("search")));
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  const onEnterHandler = (e) => {

    if (e.target.value === "") {
      searchParams.delete("search");
      setSearchParams(searchParams, {
        replace: true
      });
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      searchParams.set("page", "1");
      searchParams.set("search", encodeURI(e.target.value));
      setSearchParams(searchParams, {
        replace: true
      });
    }
  }

  return (
    <div className="h-48 flex justify-center items-center border-b-1 border-gray-400">
      <div className="w-[560px]">
        <label htmlFor="default-search"
               className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
          <input type="search" id="default-search"
                 className="block w-full p-2 pl-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder:text-sm"
                 placeholder="제목, 내용, 태그 통합검색" required
                 value={keyword} onChange={(e) => setKeyword(e.target.value)}
                 autoFocus={true}
                 onKeyUp={onEnterHandler}/>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
