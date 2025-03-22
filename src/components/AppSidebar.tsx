import { getUser } from "@/app/auth/getUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Note } from "@prisma/client";
import { prisma } from "../../prisma/prisma";
import Link from "next/link";
import GroupContentSideBar from "./GroupContentSideBar";

export async function AppSidebar() {
  const user = await getUser();

  let notes: Note[] = [];
  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        UpdatedAt: "desc",
      },
    });
  }
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup />
        <SidebarGroupLabel className="mb-2 mt-1 text-lg">
          {user ? (
            "Your Notes"
          ) : (
            <p>
              <Link href="/login" className="underline">
                Login
              </Link>{" "}
              to see Your Notes
            </p>
          )}
        </SidebarGroupLabel>
        {user && <GroupContentSideBar notes={notes} />}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
