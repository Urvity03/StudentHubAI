import * as React from "react";

import type { ToastActionElement } from "@/shared/ui/toast";

const TOAST_LIMIT = 3;

interface ToasterToast {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive" | "success";
}

type ToastInput = Omit<ToasterToast, "id">;

let listeners: Array<(toasts: ToasterToast[]) => void> = [];
let memoryState: ToasterToast[] = [];
let idCounter = 0;

function emit() {
  listeners.forEach((listener) => listener(memoryState));
}

function dismiss(id: string) {
  memoryState = memoryState.filter((t) => t.id !== id);
  emit();
}

function toast(input: ToastInput) {
  const id = `toast-${++idCounter}`;
  memoryState = [{ id, ...input }, ...memoryState].slice(0, TOAST_LIMIT);
  emit();
  return id;
}

/**
 * Minimal global toast store. Used via the `useToast` hook, which any
 * component can call to enqueue a toast without prop-drilling a dispatcher.
 */
function useToast() {
  const [toasts, setToasts] = React.useState<ToasterToast[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setToasts);
    return () => {
      listeners = listeners.filter((l) => l !== setToasts);
    };
  }, []);

  return { toasts, toast, dismiss };
}

export { useToast, toast };
export type { ToasterToast };
