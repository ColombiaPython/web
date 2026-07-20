"use client";

import { useEffect } from "react";
import { ConsoleMessage } from "@/lib/console";

export default function ConsoleInit() {
  useEffect(() => {
    ConsoleMessage();
  }, []);

  return null;
}
