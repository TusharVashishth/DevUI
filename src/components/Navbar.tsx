"use client";

import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const pathname: string = usePathname();
  const { data: session, status } = useSession();

  return (
    <div className="h-16 w-full flex justify-between items-center px-6">
      <div className="flex items-center justify-center">
        <Image
          src="/images/coding.png"
          alt="home_icon"
          width="40"
          height="40"
        />
        <h1 className="text-3xl font-bold ml-2">DevUI</h1>
      </div>

      <div>
        <Link href="/">
          <Button
            variant="link"
            className={`text-md lg:text-lg ${
              pathname == "/" ? "font-bold" : ""
            }`}
          >
            Home
          </Button>
        </Link>
        <Link href="/explore">
          <Button
            variant="link"
            className={`text-md lg:text-lg ${
              pathname == "/explore" ? "font-bold" : ""
            }`}
          >
            Explore
          </Button>
        </Link>
        {status === "authenticated" ? (
          <Link href="/profile">
            <Button
              variant="link"
              className={`text-md lg:text-lg ${
                pathname == "/profile" ? "font-bold" : ""
              }`}
            >
              Profile
            </Button>
          </Link>
        ) : (
          <Link href="/login">
            <Button
              variant="link"
              className={`text-md lg:text-lg ${
                pathname == "/login" ? "font-bold" : ""
              }`}
            >
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
