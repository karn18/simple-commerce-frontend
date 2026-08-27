import { LogOut } from "lucide-react";
import Link from "next/link";
import { logout } from "@/app/actions/logoutAction";
import Cart from "../cart";
import { Button } from "../ui/button";

const Navbar = () => {
  return (
    <header className="w-full bg-background sticky top-0 z-50">
      <div className="flex items-center justify-between gap-8 px-4 py-4 sm:px-6">
        <div className="text-muted-foreground flex items-center gap-8 font-medium md:justify-center lg:gap-16">
          <Link href="/" className="hover:text-primary max-md:hidden">
            Home
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Cart />
          <form action={logout}>
            <Button
              aria-label="Log out"
              size="icon"
              type="submit"
              variant="ghost"
            >
              <LogOut aria-hidden="true" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
