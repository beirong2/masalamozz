"use client";

import { useState } from "react";
import UpdateOrderButton from "./UpdateOrderButton";
import AcceptOrderButton from "./AcceptOrderButton";
import OrderTimeline from "@/components/orders/OrderTimeline";


export default function AdminOrderCard({
  order,
}: {
  order:any;
}) {

const [eta, setEta] = useState(
  order.estimated_ready_at
    ? new Date(order.estimated_ready_at)
        .toISOString()
        .slice(0,16)
    : ""
);


function statusStyle(status:string){

switch(status){

case "received":
return "bg-yellow-100 text-yellow-800";

case "preparing":
return "bg-blue-100 text-blue-800";

case "ready":
return "bg-purple-100 text-purple-800";

case "completed":
return "bg-green-100 text-green-800";

default:
return "bg-gray-100 text-gray-700";

}

}



async function updateETA(){

const response = await fetch(
"/api/orders/update",
{
method:"POST",
headers:{
"Content-Type":"application/json",
},
body:JSON.stringify({

orderId:order.id,

estimated_ready_at:
new Date(eta).toISOString(),

}),
}
);


const data = await response.json();


if(!data.success){

alert("Failed updating ETA");

}

}



return (

<div className="rounded-3xl bg-white p-6 shadow-md">


<div className="flex justify-between">

<div>

<h2 className="text-xl font-bold">
{order.name}
</h2>


<span
className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(order.status)}`}
>
{order.status}
</span>


<p className="mt-2 text-stone-600">
{order.phone}
</p>


<p className="text-stone-600">
{order.order_type === "delivery"
? `Delivery: ${order.address}`
: "Pickup"}
</p>


</div>


<div className="text-right">

<p className="text-3xl font-bold text-[#2E3416]">
${Number(order.total).toFixed(2)}
</p>

</div>


</div>



<div className="mt-5 border-t pt-5">


{order.order_items?.map((item:any)=>(

<div
key={item.id}
className="flex justify-between rounded-xl bg-stone-50 p-3 mb-3"
>

<span>
{item.quantity} × {item.name}
</span>

<span className="font-semibold">
${(item.price * item.quantity).toFixed(2)}
</span>


</div>

))}


</div>



{order.notes && (

<div className="rounded-xl bg-[#F5F1E8] p-4 mt-5">

<p className="font-semibold">
Notes
</p>

<p>
{order.notes}
</p>

</div>

)}



<div className="mt-6">

<OrderTimeline

status={
order.payment_status === "paid" &&
order.status === "received"
?"paid"
:order.status
}

paymentStatus={order.payment_status}

/>

</div>



{/* ETA */}

{order.status !== "completed" && (

<div className="mt-6 rounded-2xl bg-[#F5F1E8] p-4">

<p className="font-semibold text-[#2E3416]">
Estimated Ready Time
</p>


<div className="mt-3 flex gap-3">

<input
type="datetime-local"
value={eta}
onChange={(e)=>setEta(e.target.value)}
className="flex-1 rounded-xl border p-3"
/>


<button
onClick={updateETA}
className="rounded-xl bg-[#2E3416] px-5 text-white font-semibold"
>
Save
</button>


</div>

</div>

)}



<div className="mt-6 grid gap-3 sm:grid-cols-2">


{order.payment_status === "awaiting_confirmation" && (

<UpdateOrderButton
orderId={order.id}
text="Confirm Payment"
payment_status="paid"
color="bg-green-700 hover:bg-green-800"
/>

)}



{order.payment_status === "paid" &&
order.status==="received" && (

<AcceptOrderButton
orderId={order.id}
/>

)}



{order.status==="preparing" && (

<UpdateOrderButton
orderId={order.id}
text="Mark Ready"
status="ready"
color="bg-purple-700 hover:bg-purple-800"
/>

)}



{order.status==="ready" && (

<UpdateOrderButton
orderId={order.id}
text="Complete Order"
status="completed"
color="bg-stone-700 hover:bg-stone-800"
/>

)}


</div>


</div>

);

}