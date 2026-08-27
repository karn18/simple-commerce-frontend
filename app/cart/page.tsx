import Footer from "@/components/footer";
import MyCart from "@/components/nav/my-cart";
import Navbar from "@/components/nav/navbar";

export default function Cart() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-1 flex-col gap-4 bg-white px-4 dark:bg-black sm:px-8 mx-auto">
        <Navbar />
        <MyCart />
        <Footer />
      </main>
    </div>
  );
}
