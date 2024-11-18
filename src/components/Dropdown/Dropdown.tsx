"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import "./styles.css";

interface Props {
  DropdownContent: React.ReactNode;
  DropdownTrigger: React.ReactNode;
  isActive?: boolean;
}

const Dropdown = (props: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Customise options"
          className="cursor-pointer text-black capitalize text-sm font-semibold"
        >
          {props.DropdownTrigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="DropdownMenuContent"
          sideOffset={5}
          align="end"
          style={{ zIndex: 5000 }}
        >
          {props.DropdownContent}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default Dropdown;
