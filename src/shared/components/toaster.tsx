import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/shared/ui/toast";
import { useToast } from "@/shared/hooks/use-toast";

/**
 * Mounted once at the app root (see App.tsx). Renders whatever toasts are
 * currently in the global toast store.
 */
export function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <ToastProvider swipeDirection="right">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast key={id} variant={variant} onOpenChange={(open) => !open && dismiss(id)}>
          <div className="grid gap-1">
            {title ? <ToastTitle>{title}</ToastTitle> : null}
            {description ? <ToastDescription>{description}</ToastDescription> : null}
          </div>
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
