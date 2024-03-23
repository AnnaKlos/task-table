import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";

const Pagination = ({ getData, page, setPage }) => {
  // prev page func
  const previousPage = (page) => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  //next page func
  const nextPage = (page) => {
    if (page !== getData.total_pages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="mx-auto flex space-x-4">
      <button
        name="previous"
        className={`mx-auto border-0 rounded-md shadow-md px-4 py-2 font-medium ${
          page === 1
            ? "cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-gray-400"
            : "cursor-pointer bg-slate-300 hover:bg-slate-400"
        }`}
        onClick={() => previousPage(page)}>
        <ArrowLeft />
      </button>
      <button
        title="next"
        className={`mx-auto border-0 rounded-md shadow-md px-4 py-2 font-medium ${
          page === getData?.total_pages
            ? "cursor-not-allowed bg-slate-100 hover:bg-slate-200 text-gray-400"
            : "cursor-pointer bg-slate-300 hover:bg-slate-400 "
        }`}
        onClick={() => nextPage(page)}>
        <ArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
