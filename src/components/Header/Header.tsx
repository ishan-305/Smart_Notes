"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../DarkModeToogel";
import LogoutButton from "../LogoutButton";

const Header: React.FC = () => {
  const user = null;

  return (
    <>
      <header className="flex font-mono text-white justify-between items-center px-[60px] py-[20px] bg-popover shadow-md">
        <Link href={"/"}>
          <div className="flex gap-4">
            <Image
              src="\Smart_Notes_icon.svg"
              alt="logo"
              height={38}
              width={38}
            />
            <Image src="/SmartNotes.svg" alt="Name" height={18} width={127} />
          </div>
        </Link>

        <div className="flex gap-4 ">
          {user ? (
            <LogoutButton />
          ) : (
            <>
              <Button asChild>
                <Link href="/auth/signup" className="hidden sm:block">
                  SignUp
                </Link>
              </Button>
              <Button asChild variant={"secondary"}>
                <Link href="/auth/login">Login</Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </header>
    </>
  );
};

export default Header;
