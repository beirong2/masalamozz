"use client";

const steps = [
  {
    id:"received",
    label:"Order Received",
    description:"Your order has been received",
  },
  {
    id:"paid",
    label:"Payment Confirmed",
    description:"Payment has been verified",
  },
  {
    id:"preparing",
    label:"Preparing",
    description:"Our chefs are preparing your food",
  },
  {
    id:"ready",
    label:"Ready",
    description:"Your order is ready",
  },
  {
    id:"completed",
    label:"Completed",
    description:"Order completed",
  },
];

const statusOrder = [
  "received",
  "paid",
  "preparing",
  "ready",
  "completed",
];

export default function OrderTimeline({
  status,
  paymentStatus,
}: {
  status: string;
  paymentStatus: string;
}) {

  const currentIndex = statusOrder.indexOf(status);

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-xl font-bold text-[#2E3416]">
          Order Status
        </h2>

        <p className="text-sm text-stone-500">
          Payment: {paymentStatus}
        </p>
      </div>


      <div className="relative">

        {steps.map((step, index) => {

          const complete = index <= currentIndex;
const active = index === currentIndex;

          return (
            <div
              key={step.id}
              className="relative flex gap-4 pb-8"
            >

              {index !== steps.length - 1 && (
  <div
    className={`absolute left-[11px] top-6 h-full w-0.5 ${
      index < currentIndex
        ? "bg-[#2E3416]"
        : "bg-stone-200"
    }`}
  />
)}


              <div
                className={`z-10 flex h-6 w-6 items-center justify-center rounded-full ${
                  complete
                    ? "bg-[#2E3416]"
                    : "bg-stone-200"
                }`}
              />


              <div>
                <p
                  className={`font-semibold ${
                    complete
                      ? "text-[#2E3416]"
                      : "text-stone-400"
                  }`}
                >
                  {step.label}
                </p>

                <p className="text-sm text-stone-500">
                  {step.description}
                </p>
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}