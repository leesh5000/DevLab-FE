import Categories from "../utils/Categories.js";
import {useNavigate} from "react-router-dom";

export const CategoryItem = ({category}) => {

  const navigate = useNavigate();

  const onClickHandler = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate(`/posts?category=${encodeURI(category)}&page=1`);
  }

  const value = Categories[category];

  switch (value) {
    case Categories.QUESTION:
      return (
        <button className="bg-indigo-100 text-indigo-800 hover:bg-indigo-300 active:ring-2 text-xs font-medium px-1 py-0.5 rounded dark:bg-gray-700 dark:text-indigo-400 border border-indigo-400" onClick={onClickHandler}>
          {value}
        </button>
      );
    case Categories.NOTICE:
      return (
        <button className="bg-red-100 text-red-800 text-xs hover:bg-red-300 active:ring-2 font-medium px-1 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400" onClick={onClickHandler}>
          {value}
        </button>
      );
    case Categories.INFORMATION:
      return (
        <button className="bg-yellow-100 text-yellow-800 text-xs hover:bg-yellow-300 active:ring-2 font-medium px-1 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-400 border border-yellow-400" onClick={onClickHandler}>
          {value}
        </button>
      );
    case Categories.TIPS:
      return (
        <button className="bg-green-100 text-green-800 text-xs hover:bg-green-300 active:ring-2 font-medium px-1 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400" onClick={onClickHandler}>
          {value}
        </button>
      );
    case Categories.FREE:
      return (
        <button className="bg-purple-100 text-purple-800 text-xs hover:bg-purple-300 active:ring-2 font-medium px-1 py-0.5 rounded dark:bg-purple-700 dark:text-purple-400 border border-purple-400" onClick={onClickHandler}>
          {value}
        </button>
      );
    default:
      return (
        <button className="bg-gray-100 text-gray-800 text-xs hover:bg-gray-300 active:ring-2 font-medium px-1 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-400" onClick={onClickHandler}>
          {value}
        </button>
      );
  }
}
