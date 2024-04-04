import toast from "react-hot-toast";

const success = (message: string) => {
  return toast.success(message);
};

const error = (message: string) => {
  return toast.error(message);
};

export { success as successToast, error as errorToast };
