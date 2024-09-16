"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { RiTeamFill } from "react-icons/ri";
import { toast } from "sonner";

function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const createTeam = useMutation(api.teams.createTeam);

  const { user }: any = useKindeBrowserClient();
  const router = useRouter();

  // const createNewTeam = () => {
  //   if (!user?.email) {
  //     toast.error("User email is not available. Please log in.");
  //     return;
  //   }
  //   createTeam({
  //     teamName: teamName,
  //     createdBy: user?.email,
  //   }).then((res) => {
  //     console.log(res);
  //     if (res) {
  //       router.push("/dashboard");
  //       toast("Team Created Successfully!!!");
  //     }
  //   });
  // };
  const createNewTeam = async () => {
    // Ensure that user.email is available before making the mutation call
    if (!user?.email) {
      toast.error("User email is not available. Please log in.");
      return;
    }
  
    try {
      const result = await createTeam({
        teamName: teamName,
        createdBy: user.email,
      });
  
      if (result) {
        router.push("/dashboard");
        toast.success("Team Created Successfully!");
      }
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error("Failed to create the team. Please try again.");
    }
  };
  
  return (
    <div className="px-6 md:px-16 my-16">
      <Image src="/logo-black.png" alt="logo" width={200} height={200} />
      <div className="flex flex-col items-center mt-8">
        <div className="flex gap-1 items-center border border-zinc-500 rounded-md p-1">
          <RiTeamFill />
          <h2>{teamName}'s Team</h2>
        </div>
        <h2 className="font-bold text-[40px] py-3">
          What should we call your team?
        </h2>
        <h2 className="text-gray-500">
          You can always change this later from settings
        </h2>
        <div className="mt-7 w-[40%]">
          <label className="text-gray-500">Team Name</label>
          <Input
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="mt-3 focus:border-1 focus:border-zinc-400"
            placeholder="Team Name"
          />
        </div>
        <Button
          className="bg-blue-500 mt-9 w-[30%] hover:bg-blue-600"
          disabled={!(teamName && teamName?.length > 0)}
          onClick={() => createNewTeam()}
        >
          Create Team
        </Button>
      </div>
    </div>
  );
}

export default CreateTeam;
