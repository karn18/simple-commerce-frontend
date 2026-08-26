"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

interface CustomPaginationProps {
  currentPage: number;
  total: number;
  url: string;
}

export default function CustomPagination({
  currentPage,
  total,
  url,
}: CustomPaginationProps) {
  const nextUrl = currentPage < total ? `${url}?page=${currentPage + 1}` : null;
  const previousUrl = currentPage > 1 ? `${url}?page=${currentPage - 1}` : null;
  return (
    <Pagination className="mx-0 w-auto">
      <PaginationContent>
        <PaginationItem>
          {previousUrl && <PaginationPrevious href={previousUrl} />}
        </PaginationItem>
        <PaginationItem>
          {nextUrl && <PaginationNext href={nextUrl} />}
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
