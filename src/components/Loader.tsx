"use client";
import Image from "next/image";

export default function Loader() {
  return (
    <div className="mt-6">
      <Image src="/images/loading.svg" alt="Loading" width={400} height={400} />
      <p className="text-xl">Hold we are loading some best UI for you.</p>
    </div>
  );
}
