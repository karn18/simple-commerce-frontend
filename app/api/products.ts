import type { ProductsResponse } from "@/types/product";
import { BASE_URL } from "./constants";

interface ProductProps {
  page: number;
  pageSize?: number;
}

export async function getProducts(
  token: string | undefined,
  { page = 1, pageSize = 10 }: ProductProps,
): Promise<ProductsResponse> {
  "use cache";

  const query = new URLSearchParams({
    page: page.toString(),
    page_size: pageSize.toString(),
  });
  const response = await fetch(
    `${BASE_URL}/api/catalog/product/?${query.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to get banners");
  }

  return response.json();
}
