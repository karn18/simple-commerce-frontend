import { afterEach, expect, test, vi } from "vitest";
import { getBanners } from "../app/api/banners";

const fetchMock = vi.fn();

afterEach(() => {
  vi.restoreAllMocks();
});

test("gets banners with the authorization token", async () => {
  const banners = [
    {
      id: "banner-1",
      image: "/banners/summer-sale.jpg",
      updatedAt: "2026-08-21T00:00:00.000Z",
    },
  ];
  fetchMock.mockResolvedValue(
    new Response(JSON.stringify(banners), { status: 200 }),
  );
  vi.stubGlobal("fetch", fetchMock);

  await expect(getBanners("test-token")).resolves.toEqual(banners);
  expect(fetchMock).toHaveBeenCalledWith(
    "https://sc1.al8m.com/api/shop/banner/",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer test-token",
      },
    },
  );
});

test("throws when getting banners fails", async () => {
  fetchMock.mockResolvedValue(new Response(null, { status: 500 }));
  vi.stubGlobal("fetch", fetchMock);

  await expect(getBanners(null)).rejects.toThrow("Failed to get banners");
});
