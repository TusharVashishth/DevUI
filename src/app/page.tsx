import Navbar from "@/components/Navbar";
import { getHomeUIs } from "@/lib/serverMethods";
import PostCard from "@/components/postCard";

export default async function Home() {
  const data = await getHomeUIs();
  console.log("The data is", data);
  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="flex justify-center flex-col items-center">
          <h1 className="text-5xl font-bold">UI Home</h1>
          <p className="text-3xl">
            Find worlds Best UI/UX from amazing developers.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:place-content-center sm:items-center mt-10">
            {data.map((item: UiApiType) => (
              <PostCard post={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
