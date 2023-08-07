"use client";
import Image from "next/image";

export default function Loading() {
  return (
    <div>
      <div>
        <div className="h-screen w-screen flex justify-center items-center flex-col">
          <Image
            src="/images/loading.svg"
            width="400"
            height="400"
            alt="Error image"
          />
          <h1 className="text-2xl font-bold">Loading Please wait....</h1>
        </div>
      </div>
    </div>
  );
}
