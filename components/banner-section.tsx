import { cookies } from "next/headers";
import { getBanners } from "@/app/api/banners";
import type { Banner } from "@/types/banner";
import { BannerCarousel } from "./banner-carousel";

export default async function BannerSection() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const banners: Banner[] = await getBanners(token as string);

  return <BannerCarousel banners={banners} />;
}
