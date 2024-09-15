"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import { useConvex, useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";

function Dashboard() {
  const { user }: any = useKindeBrowserClient();
  const getUser = useQuery(api.user.getUser, { email: user?.email });
  const createUser = useMutation(api.user.createUser);
  const convex = useConvex();
  useEffect(() => {
    if (user) {
      checkUser();
    }
  }, [user]);

  const checkUser = async () => {
    const result = await convex.query(api.user.getUser, { email: user?.email });
    if (!result?.length) {
      createUser({
        name: user.given_name,
        email: user.email,
        image: user.picture,
      }).then((res) => {
        console.log(res);
      });
    }
  };
  return (
    <div>
      <Button>
        <LogoutLink postLogoutRedirectURL="/">Logout</LogoutLink>
      </Button>
    </div>
  );
}

export default Dashboard;
