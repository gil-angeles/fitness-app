import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (newPage: number) => void;
}

const Pagination = ({ currentPage, totalPages, onChange }: PaginationProps) => {
  const isFirst = currentPage === 0;
  const isLast = currentPage === totalPages - 1;

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <ChevronLeft
        size={18}
        color="white"
        onClick={() => !isFirst && onChange(currentPage - 1)}
        className={`cursor-pointer ${isFirst ? "opacity-30 pointer-events-none" : ""}`}
      />

      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#cc221a] text-white text-sm font-medium">
        {currentPage + 1}
      </div>

      <ChevronRight
        size={18}
        color="white"
        onClick={() => !isLast && onChange(currentPage + 1)}
        className={`cursor-pointer ${isLast ? "opacity-30 pointer-events-none" : ""}`}
      />
    </div>
  );
};

export default Pagination;
