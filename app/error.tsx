"use client";

import { useAppDispatch } from "@/hooks";
import { logout } from "@/redux/actions";
import { useEffect } from "react";

export default function Error({
  error,
  reset
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const dispatch = useAppDispatch();
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            reset();
            dispatch(logout.request());
            window.location.href = "/";
          }
        }
      >
        Try again
      </button>
    </div>
  );
}
