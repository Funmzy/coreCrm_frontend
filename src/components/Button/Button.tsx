import clsx from "clsx";
import React from "react";

interface ButtonProps {
  text: string;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  text,
  className,
  onClick,
  loading,
}) => {
  return (
    <button
      className={clsx(
        "bg-[#1B59F8] text-white text-center cursor-pointer py-2 rounded-md w-full",
        loading && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
