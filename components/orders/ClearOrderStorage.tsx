"use client";

import { useEffect } from "react";

export default function ClearOrderStorage() {
  useEffect(() => {
    localStorage.removeItem("currentOrderId");
  }, []);

  return null;
}