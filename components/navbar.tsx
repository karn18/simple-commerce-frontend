import Link from "next/link";
import Cart from "./cart";

const Navbar = () => {
  return (
    <header className="w-full bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between gap-8 px-4 py-7 sm:px-6">
        <div className="text-muted-foreground flex items-center gap-8 font-medium md:justify-center lg:gap-16">
          <Link href="/" className="hover:text-primary max-md:hidden">
            Home
          </Link>
        </div>
        <div className="flex">
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
