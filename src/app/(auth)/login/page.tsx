"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import AuthNav from "@/components/AuthNav";
import { useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";
import { signIn } from "next-auth/react";

export default function Login() {
  const params = useSearchParams();
  const [authState, setAuthState] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<AuthValidationType>({});
  const [loading, setLoading] = useState<boolean>(false);

  const login = () => {
    setLoading(true);
    axios
      .post("/api/auth/login", authState)
      .then((res) => {
        setLoading(false);
        const response = res.data;
        if (response.status == 200) {
          signIn("credentials", {
            email: authState.email,
            password: authState.password,
            callbackUrl: "/",
            redirect: true,
          });
        } else if (response.status == 400) {
          setErrors(response.errors);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("the error is", err);
      });
  };

  return (
    <div className="h-screen">
      <AuthNav />
      <div className=" grid grid-cols-1 lg:grid-cols-2 ">
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
            {params.get("message") ? (
              <Alert
                variant="default"
                className="text-green-400 border-green-300"
              >
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{params.get("message")}</AlertDescription>
              </Alert>
            ) : (
              <></>
            )}

            <h1 className="text-3xl lg:text-5xl font-bold">DevUI</h1>
            <p>Welcome Back! explore the worlds best UI's</p>
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
              <Button
                variant="default"
                className="w-full bg-[#253237]"
                disabled={loading}
                onClick={login}
              >
                {loading ? "Processing" : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center">
              <strong>Don't Have an account ?</strong>
              <Link href="/register" className="pl-2 text-orange-400">
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
