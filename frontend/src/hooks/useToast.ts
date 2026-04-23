import { toast } from "sonner";

export const useToast = () => {
  const success = (msg: string) => {
    toast.success(msg);
  };
  const error = (msg: string) => {
    toast.error(msg);
  };

  const promise = <T>(
    fn: Promise<T>,
    messages: {
      success: string;
      error: string;
    },
  ) => {
    toast.promise(fn, messages);
  };

  return { success, error, promise };
};
