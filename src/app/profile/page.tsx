import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import Signout from "@/components/Signout";
import AddUI from "@/components/AddUI";
import { getUserUIs } from "@/lib/serverMethods";
import AuthPostCard from "@/components/authPostCard";

export default async function Profile() {
  const session: CustomSession | null = await getServerSession(authOptions);
  const userUIs = await getUserUIs(session?.user?.id!);
  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="text-3xl">
            Hello , <strong>{session?.user?.name}</strong>
          </h1>
          <AddUI user_id={session?.user?.id?.toString()!} />
          <Signout />
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {userUIs != undefined && userUIs != null ? (
                userUIs.map((item: UiApiType) => (
                  <AuthPostCard post={item} key={item.id} />
                ))
              ) : (
                <div>No Record found</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
