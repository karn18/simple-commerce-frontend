import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getProducts } from "@/app/api/products";
import { keysToCamelCase } from "@/lib/utils";
import type { ProductsResponse } from "@/types/product";
import AddToCart from "./add-to-cart";
import CustomPagination from "./custom-pagination";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default async function ProductsSection({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const query = await searchParams;
  const page = Number(query.page) || 1;

  const productsResponse: ProductsResponse = keysToCamelCase(
    await getProducts(token, {
      page,
      pageSize: 1,
    }),
  );
  const { currentPage, pages } = productsResponse;
  const products = productsResponse.results;

  return (
    <>
      <div className="w-full grid grid-cols-1 gap-2 md:grid-cols-3">
        {products.map((product) => (
          <Card
            className="hover:border-primary border-primary/10 rounded-none border pt-0 shadow-none ring-0 transition-colors duration-300"
            key={product.id}
          >
            <CardContent className="px-0">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="aspect-video h-60 w-full object-cover"
              />
            </CardContent>
            <CardHeader className="mb-2 gap-3">
              <CardTitle className="text-xl font-semibold">
                <Link href="#">{product.name}</Link>
              </CardTitle>
              <CardDescription className="text-base">
                {product.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AddToCart product={product} />
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <CustomPagination currentPage={currentPage} total={pages} url="/" />
      </div>
    </>
  );
}
