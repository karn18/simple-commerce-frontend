import Link from "next/link";

export default function CheckoutCompleted() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl text-bold">Your order has been placed.</h2>

        <Link className="text-primary" href="/">
          Continue to Home
        </Link>
      </div>
    </div>
  );
}
