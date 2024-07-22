"use client";
import React, { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, Tooltip } from "@mui/material";
import { useRouter } from "next/navigation";
const SigninButton = () => {
  const router = useRouter();
  const handleSignIn = async () => {
    await signIn();
  };
  const { data: session } = useSession();
  if (session && session.user) {
    return (
      <div className="flex gap-4 ml-auto">
        <Tooltip
          title={
            <div>
              <div>{session.user.name}</div>
              <div>{session.user.email}</div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-5 py-2 border-2 border-[#ecb49d] rounded-lg mr-3"
              >
                Sign Out
              </button>
            </div>
          }
          className="bg-white"
          placement="bottom"
        >
          <Avatar
            src={session?.user?.image ? session.user.image : ""}
            alt="icon"
          />
        </Tooltip>
      </div>
    );
  }
  return (
    <button
      onClick={handleSignIn}
      className="px-5 py-2 bg-[#f3d8cd] rounded-lg"
    >
      Sign In
    </button>
  );
};

export default SigninButton;
