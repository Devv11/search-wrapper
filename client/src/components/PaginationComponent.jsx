import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PaginationComponent({ currentPage, setCurrentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let start = Math.max(1, currentPage - Math.floor(showPages / 2));
    let end = Math.min(totalPages, start + showPages - 1);

    if (end - start + 1 < showPages) {
      start = Math.max(1, end - showPages + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="pagination">
      <button
        type="button"
        className="pagination-btn"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
        Previous
      </button>

      {currentPage > 3 && (
        <>
          <button
            type="button"
            className="pagination-btn page-number"
            onClick={() => setCurrentPage(1)}
          >
            1
          </button>
          {currentPage > 4 && <span className="pagination-ellipsis">...</span>}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          type="button"
          key={page}
          className={`pagination-btn page-number ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && <span className="pagination-ellipsis">...</span>}
          <button
            type="button"
            className="pagination-btn page-number"
            onClick={() => setCurrentPage(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        type="button"
        className="pagination-btn"
        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
