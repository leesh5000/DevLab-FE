import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import "../pagination.css";
import {useSearchParams} from "react-router-dom";

function PaginatedItems({pageSize, totalItemSize}) {

  const [pageCount, setPageCount] = useState(Math.ceil(totalItemSize / pageSize));
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setPageCount(Math.ceil(totalItemSize / pageSize));
  }, [searchParams, totalItemSize]);

  const handlePageClick = (event) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  return (
    <>
      <ReactPaginate
        forcePage={searchParams.get("page") - 1 || 0}
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
