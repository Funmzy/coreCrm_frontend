"use client";

import Button from "@/components/Button/Button";
import Link from "next/link";
import Illustration from "@/components/Icons/illustration";
import Input from "@/components/input/Input";
import { useEffect, useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { status, data: session } = useSession();

  const mutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await signIn("credentials", { email, password });

        if (response?.ok) {
          router.push("/");
        }

        console.log(response);
      } catch (error) {
        console.log(error);
        alert("An error occurred");
      }
    },
  });

  useEffect(() => {
    if (status === "authenticated" && session && session.user) {
      router.push("/");
    }
  }, [router, session, status]);

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
                Log In to your Account
              </h1>
              <Input
                value={email}
                placeholder="Username"
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
            <Button
              onClick={() => mutation.mutate()}
              text="Log In"
              className="font-bold text-xl mt-4"
              loading={mutation.isPending}
            />

            <p className="mt-4 text-center text-[#808080]">
              Don&apos;t Have an account yet?{" "}
              <Link href="/signup" className="text-[#1B59F8]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* <div className="w-96  rounded-md border border-[#161516] px-4 py-8"></div> */}
    </div>
  );
};

export default Page;
