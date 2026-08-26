import { Suspense } from "react";
import BannerSection from "@/components/banner-section";
import Navbar from "@/components/navbar";
import ProductsSection from "@/components/products-section";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-cente py-8 px-8 bg-white dark:bg-black sm:items-start">
        <Navbar />

        <Suspense
          fallback={
            <div className="text-sm text-gray-500">Loading banners...</div>
          }
        >
          <BannerSection />
        </Suspense>

        <h1>Product Page</h1>

        <Suspense
          fallback={
            <div className="text-sm text-gray-500">Loading products...</div>
          }
        >
          <ProductsSection searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
