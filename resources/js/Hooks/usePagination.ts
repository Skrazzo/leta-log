import { useMemo } from "react";

export const DOTS = "..."; // Ellipsis constant

const range = (start: number, end: number): number[] => {
    if (start > end) return []; // Handle invalid range
    const length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
};

interface UsePaginationProps {
    totalPages: number;
    siblingCount?: number;
    currentPage: number;
}

export const usePagination = ({
    totalPages,
    siblingCount = 1,
    currentPage,
}: UsePaginationProps): (number | string)[] => {
    return useMemo(() => {
        // Calculate the total number of page elements to display
        // (current + siblings on both sides + first page + last page + 2 sets of DOTS)
        const totalPageNumbersInView = siblingCount + 5;

        // Case 1: If total pages is less than or equal to the number of page elements we want to show,
        // display all page numbers without any ellipses.
        if (totalPages <= totalPageNumbersInView) {
            return range(1, totalPages);
        }

        // Calculate left and right sibling indices, ensuring they are within [1, totalPages]
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

        // Determine if left or right ellipses should be shown
        // Show left dots if there's more than one page before the left sibling block (i.e., page 1 and then a gap)
        const shouldShowLeftDots = leftSiblingIndex > 2;
        // Show right dots if there's more than one page after the right sibling block (i.e., a gap and then the last page)
        const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPages;

        // Case 2: No left dots, but right dots are needed
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftRange = range(1, rightSiblingIndex);
            return [...leftRange, DOTS, lastPageIndex];
        }

        // Case 3: No right dots, but left dots are needed
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightRange = range(leftSiblingIndex, totalPages);
            return [firstPageIndex, DOTS, ...rightRange];
        }

        // Case 4: Both left and right dots are needed
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
        }

        // Fallback (should ideally not be reached if logic above is exhaustive for totalPages > totalPageNumbersInView)
        return range(1, totalPages);
    }, [totalPages, siblingCount, currentPage]);
};
