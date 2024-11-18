"use client";

import Button from "@/components/Button/Button";
import Dropdown from "@/components/Dropdown/Dropdown";
import PageLayout from "@/components/pageLayout/pageLayout";
import DataTable from "@/components/Table/Table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";

type ITasks = {
  id: string;
  description: string;
  title: string;
  dueDate: string;
  priority: string;
};

const tasks: ITasks[] = [
  {
    id: "1",
    description: "This is a task",
    title: "Task 1",
    dueDate: "2021-01-01",
    priority: "High",
  },
  ...Array.from({ length: 100 }, (_, index) => ({
    id: (7 + index).toString(),
    description: `Sample${index + 1}`,
    title: `Task${index + 1}`,
    dueDate: "2021-01-01",
    phone: `100000000${index + 1}`,
    priority: "low",
  })),
];

const Page = () => {
  const [data] = useState<ITasks[]>(tasks);
  const [filterOption, setFilterOption] = useState<string>("All");

  const columns: ColumnDef<ITasks>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Due Date",
      accessorKey: "dueDate",
    },
    {
      header: "Priority",
      accessorKey: "priority",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const filterOptions = ["All", "High", "Medium", "Low"];

  return (
    <PageLayout title={"Tasks"}>
      <div className="flex justify-end mr-10 gap-10 ">
        <Link
          href="/tasks/new"
          className="bg-[#1B59F8] text-white px-4 py-2 mb-4 cursor-pointer rounded-md"
        >
          New Task +
        </Link>
        <Dropdown
          DropdownTrigger={
            <Button text="Filter By Due Date" className="px-4 mb-4 ml-auto" />
          }
          DropdownContent={
            <ul className="flex flex-col py-2 w-full overflow-hidden z-40">
              {filterOptions.map((option) => (
                <button
                  className={`hover:bg-gray-100 px-4 my-1 cursor-pointer w- overflow-hidden ${
                    option === filterOption ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setFilterOption(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </ul>
          }
        />
        <Dropdown
          DropdownTrigger={
            <Button text="Filter By Priority" className="px-4 mb-4 ml-auto" />
          }
          DropdownContent={
            <ul className="flex flex-col py-2 w-full overflow-hidden z-40">
              {filterOptions.map((option) => (
                <button
                  className={`hover:bg-gray-100 px-4 my-1 cursor-pointer w- overflow-hidden ${
                    option === filterOption ? "bg-gray-100" : ""
                  }`}
                  onClick={() => setFilterOption(option)}
                  key={option}
                >
                  {option}
                </button>
              ))}
            </ul>
          }
        />
      </div>
      <DataTable tableInstance={table} />
    </PageLayout>
  );
};

export default Page;
