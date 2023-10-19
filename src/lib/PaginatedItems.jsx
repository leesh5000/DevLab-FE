import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import "../pagination.css";

function PaginatedItems({currentPage, setCurrentPage, pageSize, totalItemSize}) {

  const [pageCount, setPageCount] = useState(0);

  useEffect(() => {

    console.log(totalItemSize);
    setPageCount(Math.ceil(totalItemSize / pageSize));
  }, [currentPage, totalItemSize]);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <ReactPaginate
        containerClassName="pagination"
        activeClassName="active-page"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
