import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // For Previous/Next icons
import { DOTS, usePagination } from "@/Hooks/usePagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    siblingCount?: number; // Optional: number of page buttons on each side of current page
    className?: string; // Optional: for additional styling of the container
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    siblingCount = 1,
    className = "",
}) => {
    const paginationRange = usePagination({
        currentPage,
        totalPages,
        siblingCount,
    });

    // If there's only one page or no pages, don't render the pagination
    if (totalPages <= 1) {
        return null;
    }

    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Different classes
    const baseButtonClass =
        "hover:cursor-pointer flex items-center justify-center px-3 h-9 text-sm font-medium border rounded-md transition-colors duration-150 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1";
    const pageButtonClass = `${baseButtonClass} text-secondary bg-background-light border-primary/15 hover:bg-background-dark/25 hover:text-primary`;
    const activeButtonClass = `${baseButtonClass} text-background-light bg-accent border-accent hover:bg-accent/90`;
    const disabledNavButtonClass = "opacity-50 cursor-not-allowed";
    const ellipsisClass = "flex items-center justify-center px-2 h-9 text-sm text-secondary";
    const navButtonClass = `${baseButtonClass} text-secondary bg-background-light border-primary/15 hover:opacity-80`;

    return (
        <nav aria-label="Page navigation" className={`flex justify-center ${className}`}>
            <ul className="inline-flex items-center space-x-2">
                {/* Previous Button */}
                <li>
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`${navButtonClass} ${currentPage === 1 ? disabledNavButtonClass : ""}`}
                        aria-label="Previous page"
                    >
                        <ChevronLeft size={18} className="mr-1" />
                        Previous
                    </button>
                </li>

                {/* Page Number Buttons */}
                {paginationRange.map((pageNumber, index) => {
                    // Using index in key for DOTS as pageNumber might not be unique if multiple DOTS
                    const key = `page-${pageNumber === DOTS ? `dots-${index}` : pageNumber}`;

                    if (pageNumber === DOTS) {
                        return (
                            <li key={key}>
                                <span className={ellipsisClass}>&#8230;</span>
                            </li>
                        );
                    }

                    const pageNum = pageNumber as number;
                    return (
                        <li key={key}>
                            <button
                                type="button"
                                onClick={() => onPageChange(pageNum)}
                                className={pageNum === currentPage ? activeButtonClass : pageButtonClass}
                                aria-current={pageNum === currentPage ? "page" : undefined}
                                aria-label={`Go to page ${pageNum}`}
                            >
                                {pageNum}
                            </button>
                        </li>
                    );
                })}

                {/* Next Button */}
                <li>
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`${navButtonClass} ${currentPage === totalPages ? disabledNavButtonClass : ""}`}
                        aria-label="Next page"
                    >
                        Next
                        <ChevronRight size={18} className="ml-1" />
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
