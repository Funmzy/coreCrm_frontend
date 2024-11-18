import { FC } from "react";

import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

interface TextLoaderProps {
  lines?: number;
  className?: string;
  textClassName?: string;
  isFixedWidth?: boolean;
  align?: "left" | "right";
}

export const TextLoader: FC<TextLoaderProps> = ({
  lines = 1,
  className = "",
  textClassName,
  isFixedWidth = false,
  align = "left",
}) => {
  const randomWidths = Array.from(Array(lines).keys()).map(
    () => Math.floor(Math.random() * 40) + 30
  );

  if (lines === 1) {
    return (
      <div
        className={cn(
          `animate-pulse rounded-sm bg-red-400 ${textClassName}`,
          align === "right" && "float-right"
        )}
        style={isFixedWidth ? {} : { width: randomWidths[0] + "%" }}
      ></div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1", className)}>
      {Array.from(Array(lines).keys()).map((_, index) => (
        <div
          key={index}
          className={cn(
            `col-span-2 animate-pulse rounded-sm bg-gray-50 ${textClassName}`,
            align === "right" && "float-right"
          )}
          style={isFixedWidth ? {} : { width: randomWidths[index] + "%" }}
        ></div>
      ))}
    </div>
  );
};
