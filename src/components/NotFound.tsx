"use client";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mt-6">
      <Image src="/images/error.svg" alt="Loading" width={400} height={400} />
      <p className="text-xl">No UI found . Pls try with another field.</p>
    </div>
  );
}
