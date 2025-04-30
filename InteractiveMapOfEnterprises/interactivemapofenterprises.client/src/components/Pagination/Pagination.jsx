import ButtonIcon from "../Buttons/ButtonIcon";

import classes from "./Pagination.module.css";

import backArrowIcon from "./../../assets/icons/back_arrow.svg";
import nextArrowIcon from "./../../assets/icons/next_arrow.svg";

function Pagination({
  currentPage,
  totalPages,
  alignment = "start",
  onPageChange,
}) {
  const MIN_COUNT_PAGE_FOR_PAGINATION = 2;

  if (totalPages < MIN_COUNT_PAGE_FOR_PAGINATION) return null;

  const getPaginationRange = () => {
    const range = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    if (start > 1) {
      range.unshift("...");
      range.unshift(1);
    }
    if (end < totalPages) {
      range.push("...");
      range.push(totalPages);
    }
    return range;
  };

  const paginationRange = getPaginationRange();

  return (
    <div className={`${classes.pagination} ${classes[alignment]}`}>
      <ButtonIcon
        src={backArrowIcon}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      <div className={classes.pages}>
        {paginationRange.map((page, index) => (
          <button
            key={index}
            className={classes.bntPage}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === currentPage || typeof page !== "number"}
          >
            {page}
          </button>
        ))}
      </div>
      <ButtonIcon
        src={nextArrowIcon}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}

export default Pagination;
