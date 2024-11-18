"use client";

import Button from "@/components/Button/Button";
import Illustration from "@/components/Icons/illustration";
import Input from "@/components/input/Input";
import useApiClient from "@/hooks/useApiClient";
import Link from "next/link";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const apiClient = useApiClient();

  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!email || !password || !username) {
        alert("Please enter email and password");
      }

      if (password !== confirmPassword) {
        alert("Password and confirm password does not match");
      }

      const response = await apiClient("auth/signup", "POST", undefined, {
        email,
        password,
        username,
      });

      console.log(response);

      if (response.status === 200) {
        router.push("/login");
      }
    },
  });

  return (
    <div className="bg-[#F5F5F5] h-screen flex justify-center items-center">
      <div className="grid grid-cols-12 items-center justify-center ">
        <div className="col-span-12 hidden lg:block md:col-span-6">
          <Illustration />
        </div>
        <div className="col-span-12 md:col-span-6">
          <div className="md:w-[400px] w-full md:my-0 mx-4 rounded-md px-4 py-8">
            <div className="flex flex-col h-full w-full">
              <h1 className="text-2xl font-bold mb-4 text-center">
                Create An Account
              </h1>
              <Input
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
              <Input
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button
              text="Sign Up"
              onClick={() => mutation.mutate()}
              loading={mutation.isPending}
              className="font-bold text-xl mt-4"
            />

            <p className="mt-4 text-center text-[#808080]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#1B59F8]">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
