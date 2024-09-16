import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FilesListContext";
export interface TEAM {
  createdBy: String;
  teamName: String;
  _id: String;
}
function SideNav() {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const [activeTeam, setActiveTeam] = useState<TEAM>();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const convex = useConvex();
  const { fileList_,setFileList_} = useContext(FileListContext);
  useEffect(() => {
    activeTeam && getFiles();
  }, [activeTeam]);
  const onFileCreate = (fileName: string) => {
    console.log(fileName);
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: "",
    }).then(
      (res) => {
        if (res) {
          getFiles();
          toast("File Created Successfully");
        }
      },
      (e) => {
        toast("Error while Creating File!");
      }
    );
  };
  const getFiles = async () => {
    const result = await convex.query(api.files.getFiles, {
      teamId: activeTeam?._id,
    });
    console.log("Files", result);
    setFileList_(result)
    setTotalFiles(result?.length);
  };
  return (
    <div className="p-6 h-screen fixed w-72 border-r flex flex-col">
      <div className="flex-1">
        <SideNavTopSection
          user={user}
          setActiveTeamInfo={(activeTeam: TEAM) => setActiveTeam(activeTeam)}
        />
      </div>
      <div>
        <SideNavBottomSection
          totalFiles={totalFiles}
          onFileCreate={onFileCreate}
        />
      </div>
    </div>
  );
}
export default SideNav;
