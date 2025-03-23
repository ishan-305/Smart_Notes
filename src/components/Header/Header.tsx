import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { ModeToggle } from "../DarkModeToogel";
import LogoutButton from "../LogoutButton";

import { User } from "@supabase/supabase-js";
import HeaderWrapper from "./HeaderWrapper";
import { shadow } from "@/styles/utils";
import { SidebarTrigger } from "../ui/sidebar";
interface HeaderProps {
  user: User | null; // Adjust the type based on your `getUser()` return type
}
const Header: React.FC = async () => {
  const user = await HeaderWrapper();
  return (
    <>
      <header
        className="flex font-mono text-white justify-between items-center px-[60px] py-[20px] bg-popover shadow-md"
        style={{
          boxShadow: shadow,
          position: "relative",
        }}
      >
        <SidebarTrigger
          className="absolute"
          style={{
            top: "10px", // Adjust this value to position the trigger correctly
            left: "10px", // Adjust this value to position the trigger correctly
          }}
        />
        <Link href={"/"} className="flex items-end gap-2">
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
                <Link href="/signup" className="hidden sm:block">
                  SignUp
                </Link>
              </Button>
              <Button asChild variant={"secondary"}>
                <Link href="/login">Login</Link>
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
