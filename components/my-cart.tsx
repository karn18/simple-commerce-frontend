"use client";

import { useAppContext } from "@/contexts/app-context";
import CheckoutForm from "./checkout-form";

export default function MyCart() {
  const { cart, token } = useAppContext();

  if (cart.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground">
        Your cart is empty.
      </div>
    );
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="w-full space-y-6">
      <h2 className="text-2xl font-semibold">Your Cart</h2>

      <ul className="divide-y">
        {cart.map((item) => (
          <li key={item.id} className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                Qty: {item.quantity} &times; ${item.price}
              </p>
            </div>
            <p className="font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between border-t pt-4 text-lg font-semibold">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <CheckoutForm />
    </div>
  );
}
