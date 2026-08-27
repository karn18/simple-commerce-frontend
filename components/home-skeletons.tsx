import type React from "react";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={`animate-pulse rounded-md bg-muted ${className ?? ""}`}
      {...props}
    />
  );
}

export function BannerSkeleton() {
  return <Skeleton className="w-full" style={{ aspectRatio: "4 / 3" }} />;
}

export function ProductsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {["product-one", "product-two", "product-three"].map((productId) => (
        <div className="overflow-hidden border border-border" key={productId}>
          <Skeleton className="h-fit w-full rounded-none" />
          <div className="space-y-3 p-6">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
}
