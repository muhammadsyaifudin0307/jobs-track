type ToastType = "succes" | "error" | "warning" | "info";

export interface ToastProps {
  type: ToastType;
  message: string;
  description?: string;
}
