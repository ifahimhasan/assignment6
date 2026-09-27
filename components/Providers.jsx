"use client";

import { Toaster } from "sonner";
import { PlanProvider } from "@/context/PlanContext";

export default function Providers({ children }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        theme="dark"
        position="bottom-right"
        closeButton
        toastOptions={{
          style: {
            background: "#14161a",
            border: "1px solid #262a31",
            color: "#ffffff",
          },
        }}
      />
    </PlanProvider>
  );
}
