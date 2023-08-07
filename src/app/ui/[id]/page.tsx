import Navbar from "@/components/Navbar";
import PostCard from "@/components/postCard";
import { getUI } from "@/lib/serverMethods";
import React from "react";

export default async function Page({ params }: { params: { id: number } }) {
  const post: UiApiType = await getUI(params.id);
  return (
    <div>
      <Navbar />
      <div className="h-screen w-screen flex justify-center items-center">
        <PostCard post={post} />
      </div>
    </div>
  );
}
