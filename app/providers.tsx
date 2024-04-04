"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { store, persistor } from "@/redux/store";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingStore } from "@/components";
import { Toaster } from "react-hot-toast";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...themeProps}>
        <ReduxProvider store={store}>
          <PersistGate loading={<LoadingStore />} persistor={persistor}>
            <Toaster toastOptions={{ duration: 3000 }} />
            {children}
          </PersistGate>
        </ReduxProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
