import { toast } from "react-toastify";

const defaultClasses = {
  className: "!p-2 !pb-3 rounded-lg",
  bodyClassName: "!px-2 !m-0 bg-gray-50 rounded-md text-black"
};

const success = (message: string) => {
  toast.success(message, {
    ...{
      ...defaultClasses
    }
  });
};

const error = (message: string) => {
  toast.error(message, {
    ...{
      ...defaultClasses
    }
  });
};

export { success as successToast, error as errorToast };
