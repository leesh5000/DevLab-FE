import {useState} from "react";
import Pagination from "react-js-pagination";
import "../paging.css"

const Paging = () => {

  const [page, setPage] = useState(0);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={10}
      totalItemsCount={45000}
      pageRangeDisplayed={5}
      prevPageText={"Prev"}
      nextPageText={"Next"}
      onChange={handlePageChange}
    />
  );
}

export default Paging;
