"use client";

import { useRouter } from "next/navigation";
import { type ComponentProps, type SubmitEvent, useState } from "react";

import {
  type SignupFormData,
  validateSignup,
} from "@/app/actions/signupAction";
import { registerUser } from "@/app/api/users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export function SignupForm({ ...props }: ComponentProps<typeof Card>) {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<keyof SignupFormData, string>>({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm_password") as string;
    const firstName = formData.get("first_name") as string;
    const lastName = formData.get("last_name") as string;
    const address = formData.get("address") as string;

    const validationResult = await validateSignup({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      address,
    });

    if (!validationResult.success) {
      setErrors(validationResult.errors ?? {});
      console.debug(validationResult.errors);
      return;
    }

    const result = await registerUser({
      email,
      password,
      first_name: firstName,
      last_name: lastName,
      address,
    });

    if (!result) {
      setErrors({ ...errors, email: "Failed to register user" });
      return;
    }

    router.push("/");
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
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
              {errors.email && <FieldError>{errors.email}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" name="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
              {errors.password && <FieldError>{errors.password}</FieldError>}
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
              {errors.confirmPassword && (
                <FieldError>{errors.confirmPassword}</FieldError>
              )}
            </Field>
            <Field>
              <FieldLabel htmlFor="first-name">First Name</FieldLabel>
              <Input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="John"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="last-name">Last Name</FieldLabel>
              <Input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Doe"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="address">Address</FieldLabel>
              <Input
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                required
              />
            </Field>

            {loading && (
              <p className="text-sm text-muted-foreground" role="alert"></p>
            )}

            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
                <FieldDescription className="px-6 text-center">
                  {/* Already have an account? <a href="#">Sign in</a> */}
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
