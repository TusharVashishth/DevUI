"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";
import React from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div>
      <div className="h-screen w-screen flex justify-center items-center flex-col">
        <Image
          src="/images/error.svg"
          width="400"
          height="400"
          alt="Error image"
        />
        <h1 className="text-2xl font-bold">
          Something went wrong. Please try again!
        </h1>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </div>
  );
}
