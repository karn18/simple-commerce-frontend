import { Suspense } from "react";
import BannerSection from "@/components/banner-section";
import { BannerSkeleton, ProductsSkeleton } from "@/components/home-skeletons";
import Navbar from "@/components/navbar";
import ProductsSection from "@/components/products-section";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-6xl flex-1 flex-col gap-10 bg-white px-4 py-6 dark:bg-black sm:px-8 sm:py-8">
        <Navbar />

        <section aria-label="Promotions" className="w-full">
          <Suspense fallback={<BannerSkeleton />}>
            <BannerSection />
          </Suspense>
        </section>

        <section aria-labelledby="products-heading" className="w-full">
          <h1
            className="mb-6 text-2xl font-semibold tracking-tight"
            id="products-heading"
          >
            Products
          </h1>

          <Suspense fallback={<ProductsSkeleton />}>
            <ProductsSection searchParams={searchParams} />
          </Suspense>
        </section>
      </main>
    </div>
  );
}
