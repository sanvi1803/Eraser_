import { Button } from "@/components/ui/button";
import { Archive, Flag, Github } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Constant from "@/app/_constant/Constant";
import Pricing from "./PricingDialog";
function SideNavBottomSection({ onFileCreate, totalFiles }: any) {
  const menuList = [
    {
      id: 1,
      name: "Getting Started",
      path: "",
      icon: Flag,
    },
    {
      id: 2,
      name: "Github",
      path: "",
      icon: Github,
    },
    {
      id: 3,
      name: "Archive",
      path: "",
      icon: Archive,
    },
  ];

  const [fileInput, setFileInput] = useState("");
  return (
    <div>
      {menuList.map((menu, index) => (
        <h2
          key={index}
          className="flex gap-2 p-1 px-2 text-[14px] hover:bg-gray-100 cursor-pointer rounded-md"
        >
          <menu.icon className="h-5 w-5" />
          {menu.name}
        </h2>
      ))}

      {/* Add new file Button */}
      <Dialog>
        <DialogTrigger className="w-full" asChild>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 justify-start mt-3">
            New File
          </Button>
        </DialogTrigger>
        {totalFiles < Constant.MAX_FREE_FILE ? (
          <DialogContent className="bg-white">
            <DialogHeader className="">
              <DialogTitle>Create New File</DialogTitle>
              <DialogDescription>
                <Input
                  value={fileInput}
                  onChange={(e) => setFileInput(e.target.value)}
                  className="mt-3 focus:border focus:border-gray-600 text-zinc-800"
                  placeholder="Enter File Name"
                />
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={!(fileInput && fileInput.length > 3)}
                  onClick={() => onFileCreate(fileInput)}
                >
                  Create
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        ) : (
          <Pricing />
        )}
      </Dialog>

      {/* Progress Bar */}
      <div className="h-4 w-full bg-gray-300 rounded-full mt-5">
        <div
          className={`h-4 bg-blue-600 rounded-full`}
          style={{ width: `${(totalFiles / 5) * 100}%` }}
        ></div>
      </div>

      <h2 className="mt-3 text-[14px]">
        <strong>{totalFiles}</strong> out of{" "}
        <strong>{Constant.MAX_FREE_FILE}</strong> files used
      </h2>
      <h2 className="text-[12px] mt-1">
        Upgrade your plan for unlimited access
      </h2>
    </div>
  );
}

export default SideNavBottomSection;
