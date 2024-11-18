import React, { memo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";

import styles from "./dialog.module.css";

interface Props {
  title: string;
  content?: React.ReactNode;
  trigger?: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loading?: boolean;
  variant?: "info" | "warning" | "error";
  classNames?: string;
  includeCloseIcon?: boolean;
}

const DialogComponent: React.FC<Props> = memo(function DialogComponent({
  open,
  setOpen,
  title,
  content,
  variant,
  classNames,
  includeCloseIcon = true,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />

        <Dialog.Content
          className={clsx(
            styles.DialogContent,
            styles["DialogContent-min"],
            variant && styles[`DialogContent-${variant}`],
            classNames && classNames
          )}
          title={title}
        >
          {title && (
            <Dialog.Title className={styles.DialogTitle}>{title}</Dialog.Title>
          )}
          {content}
          {includeCloseIcon && (
            <Dialog.Close asChild>
              <button className={styles.IconButton} aria-label="Close">
                X
              </button>
            </Dialog.Close>
          )}
          {/* <div className={"flex items-center justify-between mt-8"}>
            {cancelText && onCancel && (
              <Dialog.Close asChild>
                <ActionButton
                  label={cancelText}
                  className=""
                  onClick={() => handleClick("cancel")}
                />
              </Dialog.Close>
            )}
            {confirmText && onConfirm && (
              <ActionButton
                label={confirmText}
                className=""
                onClick={() => handleClick("confirm")}
                isLoading={loading}
              />
            )}
          </div> */}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default DialogComponent;
