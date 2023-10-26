import {useSearchParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const SearchBar = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (searchParams.get("keyword")) {
      setKeyword(decodeURI(searchParams.get("keyword")));
    } else {
      setKeyword("");
    }
  }, [searchParams]);

  const onKeywordChangeHandler = (e) => {
    setKeyword(e.target.value);
  }

  const onSearchHandler = (e) => {

    e.preventDefault();

    if (keyword === "") {
      searchParams.delete("keyword");
    } else {
      searchParams.set("keyword", encodeURI(keyword));
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);

  }

  return (
    <div className="my-20 mx-52">
      <form className="relative" onSubmit={onSearchHandler}>
        <input type="text" id="floating_outlined" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
               placeholder=" " value={keyword} onChange={onKeywordChangeHandler}/>
        <label htmlFor="floating_outlined" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">
          제목, 내용, 태그 통합검색
        </label>
      </form>
      <p id="floating_helper_text" className="mt-2 text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" className="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>
    </div>
  );
}

export default SearchBar;
