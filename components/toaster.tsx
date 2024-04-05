import toast, { ToastOptions } from "react-hot-toast";

const defaultOptions:ToastOptions = {
  duration: 5000,
  position: "top-center"
};

const toastController = toast;

const success = (message: string) => {
  return toast.success(message, defaultOptions);
};

const error = (message: string) => {
  return toast.error(message, defaultOptions);
};

const loading = () => {
  return toast.loading("Please wait...", defaultOptions);
};

export {
  toastController,
  success as successToast,
  error as errorToast,
  loading as loadingToast
};
