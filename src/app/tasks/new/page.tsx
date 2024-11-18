"use client";

import Button from "@/components/Button/Button";
import Calendar from "@/components/Calendar/Calendar";
import Dropdown from "@/components/Dropdown/Dropdown";
import Input from "@/components/input/Input";
import PageLayout from "@/components/pageLayout/pageLayout";
import React, { forwardRef, useState } from "react";

const inputs = [
  {
    name: "title",
    type: "text",
    placeholder: "Title",
  },
  {
    name: "description",
    type: "text",
    placeholder: "Description",
  },
  {
    name: "dueDate",
    type: "date",
    placeholder: "Due Date",
  },
  {
    name: "status",
    type: "select",
    placeholder: "Status",
  },
];

const priorityOptions = ["Low", "Medium", "High"];

interface ExampleCustomInputProps {
  value?: string;
  onClick?: () => void;
  className?: string;
}

const ExampleCustomInput = forwardRef<
  HTMLButtonElement,
  ExampleCustomInputProps
>(({ value, onClick }, ref) => (
  <button onClick={onClick} ref={ref} className="flex items-center gap-2">
    <p className="mr-4 font-bold text-md">Select Due Date</p>
    <Input value={value ?? ""} onChange={() => {}} className="w-full" />
  </button>
));
ExampleCustomInput.displayName = "ExampleCustomInput"; // Set display name

const Page = () => {
  const defaultState = inputs.reduce((acc, input) => {
    acc[input.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [state, setState] = useState<Record<string, string>>(defaultState);
  const [selectedDate, setSelectedDate] = useState(Date.now());

  return (
    <PageLayout title={"Create New Task"}>
      <div className="flex flex-col gap-4 px-12 mt-10">
        <div className="">
          {inputs
            .filter((input) => input.type === "text")
            .map((input) => (
              <div key={input.name} className="col-span-6">
                <Input
                  placeholder={input.placeholder}
                  value={state[input.name]}
                  onChange={(e) =>
                    setState({ ...state, [input.name]: e.target.value })
                  }
                />
              </div>
            ))}
          <div className="col-span-6">
            <Calendar
              selectedDate={selectedDate}
              setSelectedDate={(timestamp) => {
                setSelectedDate(timestamp);
              }}
              trigger={<ExampleCustomInput className="example-custom-input" />}
              withPortal={false}
            />
          </div>
          <div className="col-span-6">
            <Dropdown
              DropdownTrigger={
                <div className=" flex items-center gap-2">
                  <button className=" flex items-center justify-center">
                    <span className="mr-1">Select Priority</span>
                  </button>
                  <Input
                    value={state.priority}
                    onChange={() => {}}
                    className="w-60"
                  />
                </div>
              }
              DropdownContent={
                <ul className="flex flex-col py-2 w-full overflow-hidden">
                  {priorityOptions.map((option) => (
                    <button
                      className={`hover:bg-gray-100 px-4 my-1 cursor-pointer w- overflow-hidden ${
                        option === state.priority
                          ? "bg-gray-100"
                          : "bg-transparent"
                      }`}
                      onClick={() => setState({ ...state, priority: option })}
                      key={option}
                    >
                      {option}
                    </button>
                  ))}
                </ul>
              }
            />
          </div>
        </div>
      </div>

      <div className="flex justify-start px-12 mt-10">
        <Button text="Create Task" className="w-44 px-10 py-4" />
      </div>
    </PageLayout>
  );
};

export default Page;

/**
 <Input
    value={new Date(selectedDate).toLocaleDateString()}
    onChange={() => {}}
  />
 */
