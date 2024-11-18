/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Button from "@/components/Button/Button";
import DialogComponent from "@/components/Dialog/Dialog";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/input/Input";
import PageLayout from "@/components/pageLayout/pageLayout";
import DataTable from "@/components/Table/Table";
import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useApiClient from "@/hooks/useApiClient";
import {
  RefetchOptions,
  QueryObserverResult,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type IContact = {
  _id: string;
  username: string;
  email: string;
  phone: string;
  address: string;
  company: string;
};

const Loader = () => {
  return <p className="w-20 h-4 bg-slate-300 animate-pulse rounded-sm"></p>;
};

export default function Home() {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [prevData, setPrevData] = useState<IContact | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [actionId, setActionId] = useState<string | null>(null);
  const router = useRouter();

  const dropDownOptions = [
    {
      label: "Edit",
      onClick: (data: IContact, id: string) => {
        setIsEditing(true);
        setPrevData(data);
        setActionId(id);
        setOpen(true);
      },
    },
    {
      label: "View Logs",
      onClick: () => {
        router.push(`/logs/11`);
      },
    },
    {
      label: "Delete",
      onClick: (data: IContact, id: string) => {
        setIsDeleting(true);
        setActionId(id);
        setIsEditing(false);
        setOpen(true);
      },
    },
  ];

  const apiClient = useApiClient();

  const {
    data: contactsData,
    isFetching,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contacts"],
    queryFn: () => apiClient("contact", "GET", {}),
  });

  const columns: ColumnDef<IContact>[] = [
    {
      header: "Name",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
        return <p>{row.original.username}</p>;
      },
    },
    {
      header: "Company",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
        return <p>{row.original.company}</p>;
      },
    },
    {
      header: "Email",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
        return <p>{row.original.email}</p>;
      },
    },
    {
      header: "Phone",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
        return <p>{row.original.phone}</p>;
      },
    },
    {
      header: "Address",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
        return <p>{row.original.address}</p>;
      },
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => {
        if (isFetching || isLoading) {
          return <Loader />;
        }
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
                    onClick={() =>
                      option.onClick(row.original, row.original._id)
                    }
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
    data: contactsData ? contactsData?.data.data : [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <PageLayout title="Contacts">
      <Button
        text="New +"
        onClick={() => {
          setIsEditing(false);
          setIsDeleting(false);
          setOpen(true);
        }}
        className="!w-32 mb-5 ml-auto"
      />

      <DataTable tableInstance={table} />
      <DialogComponent
        title={isDeleting ? "Delete Contact" : "New Contact"}
        open={open}
        setOpen={setOpen}
        content={
          isDeleting ? (
            <DeleteDialog
              id={actionId ?? ""}
              refetch={refetch}
              setClose={() => setOpen(false)}
              setDeleteId={(id) => setActionId(id)}
            />
          ) : (
            <ContactDialog
              refetch={refetch}
              setClose={() => setOpen(false)}
              isEditing={isEditing}
              setDeleteId={(id) => setActionId(id)}
              prevData={prevData}
              deleteId={actionId}
            />
          )
        }
      />
    </PageLayout>
  );
}

const DeleteDialog = ({
  id,
  refetch,
  setClose,
  setDeleteId,
}: {
  id: string;
  refetch: () => void;
  setClose: () => void;
  setDeleteId: (id: string | null) => void;
}) => {
  const apiClient = useApiClient();

  const mutation = useMutation({
    mutationFn: async () => {
      await apiClient(`contact/${id}`, "DELETE");
      setClose();
      refetch();
      setDeleteId(null);
    },
  });
  return (
    <div>
      <p className="mb-8">Are you sure you want to delete this contact?</p>
      <Button
        text="Delete"
        onClick={mutation.mutate}
        loading={mutation.isPending}
      />
    </div>
  );
};

const ContactDialog = ({
  refetch,
  setClose,
  isEditing,
  setDeleteId,
  deleteId,
  prevData,
}: {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<AxiosResponse<any, any>, Error>>;
  setClose: () => void;
  isEditing: boolean;
  setDeleteId: (id: string | null) => void;
  prevData: IContact | null;
  deleteId: string | null;
}) => {
  const inputs = ["username", "email", "phone", "address", "company", "notes"];

  const apiClient = useApiClient();
  const defaultState = inputs.reduce((acc, input) => {
    acc[input] = "";
    return acc;
  }, {} as Record<string, string>);

  const [state, setState] = useState<Record<string, string>>(defaultState);

  useEffect(() => {
    if (prevData && isEditing) {
      setState(prevData);
    }
  }, [prevData, isEditing]);

  const mutation = useMutation({
    mutationFn: async () => {
      // check if any of the fields are empty
      const isEmpty = Object.values(state).some((value) => value === "");

      if (isEmpty) {
        alert("All fields are required");
        return;
      }

      if (isEditing) {
        const payload: Record<string, string> = {};

        Object.entries(state).forEach(([key, value]) => {
          if (key !== "user") {
            payload[key] = value;
          }
        });

        await apiClient(`contact/${deleteId}`, "PATCH", undefined, payload);
        setClose();
        refetch();
        setDeleteId(null);
        return;
      }

      await apiClient("contact", "POST", undefined, {
        ...state,
      });
      setClose();
      refetch();
    },
  });

  return (
    <div>
      {Object.entries(state)
        .filter(([key]) => {
          return key !== "user";
        })
        .map(([key, value]) => (
          <Input
            key={key}
            placeholder={key}
            value={value}
            onChange={(e) => setState({ ...state, [key]: e.target.value })}
            className="border-2 rounded-sm border-gray-600"
          />
        ))}

      <Button
        text={isEditing ? "Update Contact" : "Create Contact"}
        onClick={mutation.mutate}
        loading={mutation.isPending}
      />
    </div>
  );
};
