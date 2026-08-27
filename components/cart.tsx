"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/app-context";
import { Badge } from "./ui/badge";

export default function Cart() {
  const { cart } = useAppContext();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping cart with ${cart.length} items`}
      className="relative inline-flex size-6 items-center justify-center"
    >
      <ShoppingCart />
      <Badge
        variant="secondary"
        className="absolute -right-2 -top-2 h-5 min-w-5 px-1"
      >
        {cart.length}
      </Badge>
    </Link>
  );
}
