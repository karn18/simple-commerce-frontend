"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/contexts/app-context";
import { Badge } from "./ui/badge";

export default function Cart() {
  const { cart } = useAppContext();

  return (
    <Link href="/cart">
      <ShoppingCart />
      <Badge variant="secondary" className="absolute top-4 right-2">
        {cart.length}
      </Badge>
    </Link>
  );
}
