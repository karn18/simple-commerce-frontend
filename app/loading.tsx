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
          <Skeleton className="aspect-video w-full" />
        </section>

        <section aria-label="Loading products" className="w-full">
          <Skeleton className="mb-6 h-8 w-40" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {["product-one", "product-two", "product-three"].map(
              (productId) => (
                <div
                  className="overflow-hidden border border-border"
                  key={productId}
                >
                  <Skeleton className="h-60 w-full rounded-none" />
                  <div className="space-y-3 p-6">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="mt-5 h-10 w-full" />
                  </div>
                </div>
              ),
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
