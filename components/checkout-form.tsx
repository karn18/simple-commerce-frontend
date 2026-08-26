"use client";

import { useRouter } from "next/navigation";
import type { ComponentProps, SubmitEvent } from "react";
import { checkout } from "@/app/api/checkout";
import { useAppContext } from "@/contexts/app-context";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

export default function CheckoutForm({
  ...props
}: ComponentProps<typeof Card>) {
  const { token, clearCart } = useAppContext();
  const router = useRouter();

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const address = formData.get("address") as string;
    const slipImage = formData.get("slip_image") as File;

    const result = await checkout({ token, email, address, slip: slipImage });

    if (result) {
      // redirect to completed page
      clearCart();
      router.push("/checkout/completed");
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Customer Detail</CardTitle>
        <CardDescription>
          Enter your information below to complete checkout
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
              {/* {errors.email && <FieldError>{errors.email}</FieldError>} */}
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input id="address" name="address" type="string" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="slip_image"
                name="slip_image"
                type="file"
                accept="image/png, image/jpeg, image/webp"
                required
              />
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Checkout</Button>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
