"use client";

import { useState } from "react";
import { useAppContext } from "@/contexts/app-context";
import type { Product } from "@/types/product";
import NumberInput from "./number-input";
import { Button } from "./ui/button";

interface AddToCartProps {
  product: Product;
}

export default function AddToCart({ product }: AddToCartProps) {
  const { addToCart } = useAppContext();
  const [quantity, setQuantity] = useState<number>(1);

  function handleOnChange(value: number) {
    setQuantity(value);
  }

  function handleAddToCart() {
    addToCart({ ...product, quantity });
  }

  return (
    <>
      <div>
        <NumberInput onChange={handleOnChange} />
      </div>
      <Button
        onClick={handleAddToCart}
        className="group bg-primary/10 hover:bg-primary/20 text-primary rounded-full text-sm has-[>svg]:px-6"
        size="lg"
      >
        Add to cart
      </Button>
    </>
  );
}
