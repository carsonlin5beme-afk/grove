import type { ReactNode } from "react";
import { FarmHydrator } from "@/components/farm-hydrator";

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <>
      <FarmHydrator />
      {children}
    </>
  );
}
