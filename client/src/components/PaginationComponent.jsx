import React from "react";
import { ChevronLeft, ChevronRight} from "lucide-react"

export default function PaginationComponent({ currentPage, setCurrentPage, totalPages = 5 }) { // Added totalPages prop for flexibility
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

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
      {pageNumbers.map((page) => (
        <button
          type="button"
          key={page}
          className={`pagination-btn page-number ${currentPage === page ? "active" : ""}`}
          onClick={() => setCurrentPage(page)}
          aria-current={currentPage === page ? "page" : undefined}
          aria-label={`Page ${page}`}
        >
          {page}
        </button>
      ))}
      <button
        type="button"
        className="pagination-btn"
        onClick={() => setCurrentPage(prev => prev + 1)}
        disabled={currentPage === totalPages} // Disable if on last page
        aria-label="Next page"
      >
        Next
        <ChevronRight size={16} />
      </button>
    </div>
  )
}