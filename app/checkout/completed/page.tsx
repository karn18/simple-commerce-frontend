import Link from "next/link";
import Footer from "@/components/footer";
import Navbar from "@/components/nav/navbar";

export default function CheckoutCompleted() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl h-screen flex-1 flex-col gap-4 bg-white px-4 dark:bg-black sm:px-8 mx-auto">
        <Navbar />

        <section className="grow shrink">
          <h2 className="text-3xl text-bold">Your order has been placed.</h2>

          <Link className="text-primary" href="/">
            Continue to Home
          </Link>
        </section>

        <Footer />
      </main>
    </div>
  );
}
