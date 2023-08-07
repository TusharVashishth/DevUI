import Image from "next/image";
export default function AuthNav() {
  return (
    <div className="flex absolute top-2 left-2 lg:top-5 lg:left-10 items-center">
      <Image width="50" height="50" src="/images/coding.png" alt="logo" />
      <h1 className="text-2xl font-bold">DevUI</h1>
    </div>
  );
}
