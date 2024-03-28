const defaultClasses = {
  className: "!p-2 !pb-3 rounded-lg",
  bodyClassName: "!px-2 !m-0 bg-gray-50 rounded-md text-black"
};

const success = (message: string) => {
  // toast.success(message, {
  //   ...{
  //     ...defaultClasses
  //   }
  // });
  return `success: ${message}`;
};

const error = (message: string) => {
  // toast.error(message, {
  //   ...{
  //     ...defaultClasses
  //   }
  // });
  return `error: ${message}`;
};

export { success as successToast, error as errorToast };
