"use client";

import { useRouter } from "next/navigation";

export default function ClearCompletedOrder({
  status,
}: {
  status: string;
}) {
  const router = useRouter();

  if (status !== "completed") return null;

  return (
    <button
      onClick={() => {
        localStorage.removeItem("currentOrderId");
        router.push("/");
      }}
      className="w-full rounded-xl bg-[#2E3416] py-3 font-semibold text-white hover:bg-[#475226]"
    >
      Done
    </button>
  );
}