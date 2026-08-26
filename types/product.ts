export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Product {
  id: string;
  category: Category;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
  total: number;
  pages: number;
  currentPage: number;
}

export interface ProductsResponse extends Pagination {
  results: Product[];
}
