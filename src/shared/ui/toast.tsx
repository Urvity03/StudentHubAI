import type * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "lucide-react";

import { cn } from "@/shared/lib/utils";

const ToastProvider = ToastPrimitives.Provider;

function ToastViewport({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Viewport>) {
  return (
    <ToastPrimitives.Viewport
      className={cn(
        "fixed bottom-0 right-0 z-100 flex max-h-screen w-full flex-col gap-2 p-4 sm:max-w-sm",
        className,
      )}
      {...props}
    />
  );
}

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start justify-between gap-3 overflow-hidden rounded-[var(--radius-lg)] border p-4 shadow-md animate-slide-up",
  {
    variants: {
      variant: {
        default: "border-border bg-card text-card-foreground",
        destructive: "border-destructive/30 bg-destructive text-destructive-foreground",
        success: "border-success/30 bg-success text-success-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

function Toast({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>) {
  return <ToastPrimitives.Root className={cn(toastVariants({ variant }), className)} {...props} />;
}

function ToastClose({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Close>) {
  return (
    <ToastPrimitives.Close
      className={cn("shrink-0 rounded-[var(--radius-sm)] opacity-60 transition-opacity hover:opacity-100", className)}
      {...props}
    >
      <X className="size-4" />
    </ToastPrimitives.Close>
  );
}

function ToastTitle({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Title>) {
  return <ToastPrimitives.Title className={cn("text-sm font-semibold", className)} {...props} />;
}

function ToastDescription({ className, ...props }: React.ComponentProps<typeof ToastPrimitives.Description>) {
  return <ToastPrimitives.Description className={cn("text-sm opacity-90", className)} {...props} />;
}

type ToastActionElement = React.ReactElement;

export {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
};
export type { ToastActionElement };
