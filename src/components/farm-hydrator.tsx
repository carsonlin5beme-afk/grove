import { useEffect } from "react";
import { useFarmStore } from "@/lib/farm-store";

export function FarmHydrator() {
  useEffect(() => {
    void useFarmStore.persist.rehydrate();
  }, []);
  return null;
}
