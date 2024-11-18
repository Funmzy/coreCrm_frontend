"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { signOut, useSession } from "next-auth/react";
import Button from "../Button/Button";

const navList = [
  {
    name: "Dashboard",
    href: "/",
  },
  {
    name: "Contacts",
    href: "/contacts",
  },
  {
    name: "Tasks",
    href: "/tasks",
  },
];

export default function PageLayout({
  children,
  title,
}: Readonly<{
  children: React.ReactNode;
  title: string | React.ReactNode;
}>) {
  const [showSideBar, setShowSideBar] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/login");
    }
  }, [router, session, status]);

  return (
    <div
      className={`bg-[#F5F5F5] h-screen overflow-hidden antialiased relative`}
    >
      <div className="grid grid-cols-12 h-full">
        <div
          className={`${
            showSideBar ? "block" : "hidden"
          } absolute w-full h-screen z-50 bg-white`}
        >
          {
            <SideBar
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
          }
        </div>
        <div className="hidden lg:block md:col-span-2 border-r shadow-sm rounded-r-md bg-white px-4">
          {
            <SideBar
              showSideBar={showSideBar}
              setShowSideBar={setShowSideBar}
            />
          }
        </div>
        <div className="col-span-12 lg:col-span-10 px-4">
          <nav className="flex justify-between items-center p-4 mb-2 border-b pb-10 mb-6">
            <div className="flex items-center gap-2">
              <button
                className="lg:hidden block mr-4"
                onClick={() => setShowSideBar(!showSideBar)}
              >
                <HamburgerMenuIcon />
              </button>
              <p className="lg:hidden mr-2 text-2xl font-bold text-[#ed0f84] italic">
                CRM
              </p>
              <h1 className=" font-extrabold text-2xl">{title}</h1>
            </div>
            <div className="flex items-center gap-8">
              <Button
                text="Sign out"
                onClick={() => signOut()}
                className="text-lg px-4 font-medium cursor-pointer hover:underline"
              />
            </div>
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}

const SideBar = ({
  showSideBar,
  setShowSideBar,
}: Readonly<{
  showSideBar: boolean;
  setShowSideBar: (showSideBar: boolean) => void;
}>) => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex items-center gap-2 mt-4 mb-4">
        <button
          className="lg:hidden block mr-4 mb-10 ml-6"
          onClick={() => setShowSideBar(!showSideBar)}
        >
          <HamburgerMenuIcon />
        </button>
        <p className="text-2xl font-bold text-[#1B59F8] italic mb-10">CRM</p>
      </div>
      {navList.map((item) => (
        <Link
          href={item.href}
          className={`block text-lg mb-2 font-medium px-2 py-2 rounded-sm ${
            pathname === item.href ? "bg-[#e9edf7] text-[#1B59F8]" : ""
          }`}
          key={item.name}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
};
