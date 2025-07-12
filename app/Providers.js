"use client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";

export function Providers({ children }) {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <Toaster />
        {children}
      </AppContextProvider>
    </Provider>
  );
}
