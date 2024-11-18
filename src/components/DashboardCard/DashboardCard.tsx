import React from "react";
import { AvatarIcon, ArrowUpIcon } from "@radix-ui/react-icons";

interface DashboardCardProps {
  title: string;
  value: number;
  percentage: number;
}

const DashboardCard = ({ title, value, percentage }: DashboardCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="bg-[#EFF2F7] p-4 rounded-full w-12 h-12 mb-8 flex items-center justify-center">
        <AvatarIcon className="text-[#3056D3]" />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-2xl font-bold">{value}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
        <div className="flex items-center gap-1">
          <p>{percentage}%</p>
          <ArrowUpIcon className="text-green-500 rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
