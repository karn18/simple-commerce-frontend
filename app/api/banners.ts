import type { Banner } from "@/types/banner";
import { BASE_URL } from "./constants";

type BannersResponse = Banner[];

export async function getBanners(
  token: string | null,
): Promise<BannersResponse> {
  "use cache";

  const response = await fetch(`${BASE_URL}/api/shop/banner/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get banners");
  }

  return response.json();
}
