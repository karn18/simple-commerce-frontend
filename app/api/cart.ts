import { BASE_URL } from "./constants";

interface AddToCartRequest {
  token: string | null;
  product: number;
  quantity: number;
}

interface AddToCartResponse extends AddToCartRequest {
  total_item: number;
  total_price: number;
}

export async function addItemToCart({
  token,
  product,
  quantity,
}: AddToCartRequest): Promise<AddToCartResponse> {
  const response = await fetch(`${BASE_URL}/api/sale/add-cart-item/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product, quantity }),
  });

  console.debug(response);

  if (!response.ok) {
    throw new Error("Failed to add item to cart");
  }

  return response.json();
}
