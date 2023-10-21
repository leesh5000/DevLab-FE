import {useEffect, useState} from "react";
import Categories from "../utils/Categories.jsx";
import {Link, useSearchParams} from "react-router-dom";

const Navbar = () => {

  const [searchParams] = useSearchParams();
  const [active, setActive] = useState("ALL");

  useEffect(() => {
    setActive(searchParams.get("category") || "ALL");
  }, [searchParams]);

  return (
    <>
      <div id="navbar" className="flex items-center text-sm border-b-1 border-gray-400">
        <Link to={`/posts?category=${encodeURI("ALL")}&page=1`}
              className={"py-1.5 px-4 border-1 rounded-tl-lg rounded-bl-lg border-r-0 border-gray-400 text-gray-800 hover:bg-gray-100 " + `${active === "ALL" ? 'bg-gray-200' : ''}`}>
          전체
        </Link>
        {
          Object.entries(Categories).map(([key, value]) => {
            return (
              <Link
                to={`/posts?category=${encodeURI(key)}&page=1`}
                key={key}
                className={"py-1.5 px-4 border-1 text-gray-800 hover:bg-gray-100 border-r-0 border-gray-400 " + `${active === key ? 'bg-gray-200' : ''} ${key === 'FREE' ? 'rounded-tr-lg rounded-br-lg border-r-1' : ''}`}>
                {value}
              </Link>
            );
          })
        }
      </div>
    </>
  );
}

export default Navbar;
