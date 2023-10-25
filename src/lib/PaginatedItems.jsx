import ReactPaginate from "react-paginate";
import {useEffect} from "react";
import "../pagination.css";
import {useSearchParams} from "react-router-dom";

function PaginatedItems({currentPage, pageSize, totalItemSize, totalPages, scrollToTop = true}) {

  const [searchParams, setSearchParams] = useSearchParams();
  const startItem = Math.min(currentPage * pageSize + 1, totalItemSize);
  const endItem = Math.min((currentPage + 1) * pageSize, totalItemSize);

  useEffect(() => {
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, [searchParams, totalItemSize]);

  const onPageChangeHandler = (event) => {
    searchParams.set("page", event.selected + 1);
    setSearchParams(searchParams);
  };

  return (
    <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span className="font-semibold text-gray-900 dark:text-white">{startItem} - {endItem}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalItemSize}</span></span>
      <ReactPaginate
        forcePage={currentPage}
        containerClassName="pagination"
        activeLinkClassName="active-link"
        breakLabel="..."
        nextLabel="Next"
        onPageChange={onPageChangeHandler}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
      />
    </nav>
  );
}

export default PaginatedItems;
