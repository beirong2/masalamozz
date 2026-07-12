"use client";

import UpdateOrderButton from "./UpdateOrderButton";

const statuses = [
  "received",
  "preparing",
  "ready",
  "completed",
];

export default function OrderStatusControls({
  orderId,
  currentStatus,
}: {
  orderId:string;
  currentStatus:string;
}) {

const index = statuses.indexOf(currentStatus);

return (
  <div className="flex gap-3">

    {index > 0 && (
      <UpdateOrderButton
        orderId={orderId}
        text={`← ${statuses[index-1]}`}
        status={statuses[index-1]}
        color="bg-stone-500 hover:bg-stone-600"
      />
    )}

    {index < statuses.length-1 && (
      <UpdateOrderButton
        orderId={orderId}
        text={`${statuses[index+1]} →`}
        status={statuses[index+1]}
        color="bg-[#2E3416] hover:bg-[#475226]"
      />
    )}

  </div>
);
}