"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import AuthNav from "@/components/AuthNav";

export default function Register() {
  const router = useRouter();
  const [authState, setAuthState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState<AuthValidationType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const register = () => {
    setLoading(true);
    axios
      .post("/api/auth/register", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          router.push(`/login?message=${response.message}`);
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("error is", err);
      });
  };
  return (
    <div className="h-screen">
      <AuthNav />
      <div className="grid grid-cols-1 lg:grid-cols-2 ">
        <div className="hidden lg:block">
          <Image
            src="/images/design.svg"
            width="100"
            height="100"
            alt="register logo"
            className="h-screen w-full"
          />
        </div>
        <div className="flex justify-center items-center mt-20 lg:mt-0">
          <div className="px-10 lg:px-32 w-full">
            <h1 className="text-3xl lg:text-5xl font-bold">DevUI</h1>
            <p>Explore the worlds best designs for your next project.</p>
            <div className="mt-4">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Enter your name"
                onChange={(e) =>
                  setAuthState({ ...authState, name: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.name}</span>
            </div>
            <div className="mt-4">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Enter your email"
                onChange={(e) =>
                  setAuthState({ ...authState, email: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.email}</span>
            </div>
            <div className="mt-4">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                id="password"
                placeholder="Enter your password"
                onChange={(e) =>
                  setAuthState({ ...authState, password: e.target.value })
                }
              />
              <span className="text-red-700 font-bold">{errors?.password}</span>
            </div>
            <div className="mt-4">
              <Label htmlFor="cpassword">Confirm Password</Label>
              <Input
                type="password"
                id="cpassword"
                placeholder="Confirm password"
                onChange={(e) =>
                  setAuthState({
                    ...authState,
                    password_confirmation: e.target.value,
                  })
                }
              />
            </div>
            <div className="mt-4">
              <Button
                variant="default"
                className="w-full"
                onClick={register}
                disabled={loading}
              >
                {loading ? "Processing" : "Register"}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <strong>Already Have an account ?</strong>
              <Link href="/login" className="pl-2 text-orange-400">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
