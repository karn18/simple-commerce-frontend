import { BASE_URL } from "./constants";

interface CheckoutRequest {
  token: string | null;
  email: string;
  address: string;
  slip: File;
}

interface CheckoutResponse {
  id: number;
  email: string;
  shipping_address: string;
  slip_image: string;
  status: string;
  created_at: Date;
  updated_at: Date;
}

export async function checkout({
  token,
  email,
  address,
  slip,
}: CheckoutRequest): Promise<CheckoutResponse> {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("shipping_address", address);
  formData.append("slip_image", slip);

  const response = await fetch(`${BASE_URL}/api/sale/submit-payment/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(errorMessage || "Failed to complete checkout");
  }

  return response.json();
}
