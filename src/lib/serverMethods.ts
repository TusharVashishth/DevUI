import { headers } from "next/headers";

export async function getHomeUIs() {
  const res = await fetch(`${process.env.APP_URL}/api/ui`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export async function getUserUIs(id: string) {
  const res = await fetch(`${process.env.APP_URL}/api/user/ui`, {
    headers: headers(),
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}

export async function getUI(id: number) {
  const res = await fetch(`${process.env.APP_URL}/api/ui/${id}`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  const response = await res.json();
  return response?.data;
}
