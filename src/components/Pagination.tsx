import React, { useState } from "react";

interface PaginationProps {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ setCurrentPage, currentPage, totalPage }) => {
  const [inputPage, setInputPage] = useState<number | string>(currentPage);

  // Handle page button click
  const pageChange = (page: number) => {
    if (page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    }
  };

  // Generate page numbers to show: two before and two after the current page
  const pagesToShow = [];
  for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPage, currentPage + 2); i++) {
    pagesToShow.push(i);
  }

  // Handle page search input
  const pageSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleSearchSubmit = () => {
    const page = Number(inputPage);
    if (!isNaN(page) && page >= 1 && page <= totalPage) {
      setCurrentPage(page);
    } else {
      alert("Invalid page number!");
    }
  };

  return (
    <div
      style={{
      
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        margin: "20px 0",
      }}
    >
    

      {/* Previous Page Button */}
      <button
        onClick={() => pageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          height : "40px",
          width : "60px",
          padding: "8px 16px",
          backgroundColor: currentPage === 1 ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
        }}
      >
    &laquo;
      </button>

      {/* Page Number Buttons */}
      {pagesToShow.map((page) => (
        <button
          key={page}
          onClick={() => pageChange(page)}
          style={{
            height : "40px",
          width : "60px",
            padding: "8px 16px",
            backgroundColor: currentPage === page ? "#007bff" : "",
            color: currentPage === page ? "#fff" : "",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          {page}
        </button>
      ))}

      {/* Next Page Button */}
      <button
        onClick={() => pageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        style={{
          height : "40px",
          width : "60px",
          padding: "8px 16px",
          backgroundColor: currentPage === totalPage ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: currentPage === totalPage ? "not-allowed" : "pointer",
        }}
      >
       &raquo; 
      </button>


      {/* Page Search Input */}
      <input
        type="number"
        value={inputPage}
        onChange={pageSearch}
        min={1}
        max={totalPage}
        style={{
          height : "20px",
          padding: "5px",
          width: "60px",
          textAlign: "center",
        }}
      />
      <button
        onClick={handleSearchSubmit}
        style={{
          height : "40px",
          width : "60px",
          padding: "8px 16px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Go
      </button>
    </div>
  );
};

export default Pagination;
