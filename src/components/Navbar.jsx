import {useState} from "react";
import Categories from "../utils/Categories.jsx";

const Navbar = () => {

  const [active, setActive] = useState("ALL");

  return (
    <>
      <div id="navbar" className="flex items-center">
        <button className={"py-1.5 px-4 border-1 rounded-tl-lg rounded-bl-lg border-r-0 border-gray-400 text-gray-800 hover:bg-gray-100 " + `${active === "ALL" ? 'bg-gray-200' : ''}`}
                onClick={() => setActive("ALL")}>전체</button>
        {
          Object.entries(Categories).map(([key, value]) => {
            return (
              <button key={key} className={"py-1.5 px-4 border-1 text-gray-800 hover:bg-gray-100 border-r-0 border-gray-400 "
                + `${active === key ? 'bg-gray-200' : ''} ${key === 'FREE' ? 'rounded-tr-lg rounded-br-lg border-r-1' : ''}`} onClick={() => setActive(key)}>
                {value}
              </button>
            );
          })
        }
      </div>
    </>
  )
}

export default Navbar;
