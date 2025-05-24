import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

function Pagination({ totalPages, currentPage, setCurrentPage }) {
  return (
    <div className="flex gap-2 justify-center mt-6">
      <button
        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 cursor-pointer"
      >
        <FaRegArrowAltCircleLeft size={32} />
      </button>
      <span className="px-3 my-auto pt-1 text-lg">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 cursor-pointer"
      >
        <FaRegArrowAltCircleRight size={32} />
      </button>
    </div>
  );
}

export default Pagination;
