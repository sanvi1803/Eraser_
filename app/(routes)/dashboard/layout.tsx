"use client";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FilesListContext";
function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user }: any = useKindeBrowserClient();
  const convex = useConvex();
  const router = useRouter();
  const [fileList_, setFileList_] = useState();
  useEffect(() => {
    checkTeam();
  }, [user]);

  const checkTeam = async () => {
    if (!user?.email) {
      console.error("User email is missing");
      // Optionally, display an error to the user
      return;
    }
    const result = await convex.query(api.teams.getTeam, {
      email: user?.email,
    });
    if (!result?.length) {
      router.push("teams/create");
    }
  };
  return (
    <div>
      <FileListContext.Provider value={{fileList_,setFileList_}}>
        <div className="grid grid-cols-4">
          <div className="h-screen w-72 fixed">
            <SideNav />
          </div>
          <div className="col-span-4 ml-72">{children}</div>
        </div>
      </FileListContext.Provider>
    </div>
  );
}

export default DashboardLayout;
