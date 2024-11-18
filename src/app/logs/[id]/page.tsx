"use client";

import DialogComponent from "@/components/Dialog/Dialog";
import Dropdown from "@/components/Dropdown/Dropdown";
import PageLayout from "@/components/pageLayout/pageLayout";
import DataTable from "@/components/Table/Table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

type ILogs = {
  title: string;
  description: string;
  date: string;
  type: string;
  notes: string;
  id: string;
};

// 100 sample data
const logs: ILogs[] = [
  {
    title: "Error",
    description: "This is an error",
    date: "2021-01-01",
    type: "error",
    notes: "This is a note",
    id: "1",
  },
  ...Array.from({ length: 100 }, (_, index) => ({
    id: (7 + index).toString(),
    description: `Sample${index + 1}`,
    title: `Sample${index + 1}`,
    date: "2021-01-01",
    type: "error",
    notes: "This is a note",
  })),
];

const Page = () => {
  const [data] = useState<ILogs[]>(logs);
  const [open, setOpen] = useState(false);

  const dropDownOptions = [
    {
      label: "View Note",
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  const columns: ColumnDef<ILogs>[] = [
    {
      header: "Index",
      accessorFn: (row) => row.id,
    },
    {
      header: "Title",
      accessorFn: (row) => row.title,
    },
    {
      header: "Description",
      accessorFn: (row) => row.description,
    },
    {
      header: "type",
      accessorFn: (row) => row.type,
    },
    {
      header: "Date",
      accessorFn: (row) => row.date,
    },
    {
      header: "",
      id: "actions",
      cell: ({}) => {
        return (
          <Dropdown
            DropdownTrigger={
              <button className="h-6 w-6 hover:bg-gray-500 rounded-full  flex items-center justify-center">
                <span className="mb-2">...</span>
              </button>
            }
            DropdownContent={
              <ul className="flex flex-col py-2 w-full overflow-hidden">
                {dropDownOptions.map((option) => (
                  <button
                    className="hover:bg-gray-100 px-4 my-1 cursor-pointer w- overflow-hidden"
                    onClick={option.onClick}
                    key={option.label}
                  >
                    {option.label}
                  </button>
                ))}
              </ul>
            }
          />
        );
      },
    },
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout title="Logs">
      <DataTable tableInstance={table} />
      <DialogComponent
        title={"Note"}
        open={open}
        setOpen={setOpen}
        content={<NoteDialog />}
      />
    </PageLayout>
  );
};

const NoteDialog = () => {
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda dolore
      quo hic molestias. Inventore enim illum id quas obcaecati eius mollitia
      illo optio, accusantium voluptates aspernatur, laboriosam ea a magnam,
      animi possimus aperiam et nobis odit minus ipsum? Officia esse, assumenda
      eum laudantium reprehenderit sequi autem quam eveniet ad accusamus.
    </div>
  );
};

export default Page;
