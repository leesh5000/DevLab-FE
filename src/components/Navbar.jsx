import {useEffect, useState} from "react";
import {useNavigate, useSearchParams} from "react-router-dom";

const Navbar = () => {

  const [searchParams] = useSearchParams();
  const [active, setActive] = useState("ALL");
  const navigate = useNavigate();

  useEffect(() => {
    setActive(searchParams.get("category") || "ALL");
  }, [searchParams]);

  const onCategoryHandler = (category) => {
    setActive(category);
    navigate(`/posts?category=${encodeURI(category)}&page=1`);
  }

  return (
    <>
      <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-300">
        <ul className="flex flex-wrap -mb-px">
          <button
            className={"mr-2 inline-block p-4 rounded-t-lg " + `${active === "ALL" ? 'text-blue-600 border-blue-600 border-b-2' : 'hover:border-b-2 hover:text-gray-600 hover:border-gray-400'}`}
            onClick={() => {onCategoryHandler("ALL")}}>
            전체
          </button>
          <button
            className={"mr-2 inline-block p-4 rounded-t-lg " + `${active === "NOTICE" ? 'text-blue-600 border-blue-600 border-b-2' : 'hover:border-b-2 hover:text-gray-600 hover:border-gray-400'}`}
            onClick={() => {onCategoryHandler("NOTICE")}}>
            공지
          </button>
          <button
            className={"mr-2 inline-block p-4 rounded-t-lg " + `${active === "QUESTION" ? 'text-blue-600 border-blue-600 border-b-2' : 'hover:border-b-2 hover:text-gray-600 hover:border-gray-400'}`}
            onClick={() => {onCategoryHandler("QUESTION")}}>
            질문
          </button>
          <button
            className={"mr-2 inline-block p-4 rounded-t-lg " + `${active === "TIP" ? 'text-blue-600 border-blue-600 border-b-2' : 'hover:border-b-2 hover:text-gray-600 hover:border-gray-400'}`}
            onClick={() => {onCategoryHandler("TIP")}}>
            팁
          </button>
          <button
            className={"mr-2 inline-block p-4 rounded-t-lg " + `${active === "FREE" ? 'text-blue-600 border-blue-600 border-b-2' : 'hover:border-b-2 hover:text-gray-600 hover:border-gray-400'}`}
            onClick={() => {onCategoryHandler("FREE")}}>
            자유
          </button>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
