interface ErrorData {
  name: string;
  message: string;
}
// eslint-disable-next-line
export const toError = (error: any): ErrorData => {
  if (error instanceof Error) {
    return {
      name: error.name,
      message: error.message
    };
  } else {
    return {
      name: "Error",
      message: error?.toString() || "An unknown error occurred"
    };
  }
};
