import { BannerSkeleton, ProductsSkeleton } from "@/components/home-skeletons";

function Skeleton({ className }: { className: string }) {
  return <div className={`animate-pulse rounded-md bg-muted ${className}`} />;
}

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-8 bg-white px-8 py-8 dark:bg-black">
        <header className="flex w-full items-center justify-between px-4 py-7 sm:px-6">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </header>

        <section aria-label="Loading banners" className="w-full">
          <BannerSkeleton />
        </section>

        <section aria-label="Loading products" className="w-full">
          <Skeleton className="mb-6 h-8 w-40" />
          <ProductsSkeleton />
        </section>
      </main>
    </div>
  );
}
