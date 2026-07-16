import OrderTimeline from "./OrderTimeline";

export default function OrderCard({
  order,
}: {
  order:any;
}) {

return (

<div className="rounded-3xl bg-white p-6 shadow">


<h2 className="text-2xl font-bold text-[#2E3416]">
Order
</h2>


<p className="mt-1 text-sm text-stone-500">
{new Date(order.created_at).toLocaleDateString()}
</p>



<OrderTimeline
  status={
    order.payment_status === "paid" &&
    order.status === "received"
      ? "paid"
      : order.status
  }
  paymentStatus={order.payment_status}
  orderType={order.order_type}
/>



<div className="mt-5 rounded-2xl bg-[#F8F2E9] p-5">

<p className="text-sm text-stone-500">
Estimated Ready
</p>


{order.estimated_ready_at && (

<p className="text-2xl font-bold text-[#2E3416]">

{
new Date(order.estimated_ready_at)
.toLocaleTimeString([],{
hour:"numeric",
minute:"2-digit",
})
}

</p>

)}

</div>



<div className="mt-5 rounded-xl bg-stone-50 p-4">

<p className="text-sm text-stone-500">
{
order.order_type === "pickup"
? "Pickup"
: "Delivery"
}
</p>


<p className="font-semibold">

{
order.order_type === "pickup"
? "Pickup Order"
: order.address
}

</p>


</div>




<div className="mt-6">


<h3 className="text-xl font-bold text-[#2E3416]">
Your Order
</h3>


<div className="mt-3 space-y-3">


{order.order_items?.map((item:any)=>(

<div
key={item.id}
className="flex justify-between rounded-xl bg-stone-50 p-4"
>


<div>

<p className="font-semibold">
{item.name}
</p>


<p className="text-sm text-stone-500">
Qty {item.quantity}
</p>


</div>


<p className="font-semibold">
${Number(item.price).toFixed(2)}
</p>


</div>

))}


</div>

</div>




<div className="mt-6 flex justify-between border-t pt-5 text-xl font-bold">

<span>
Total
</span>

<span>
${Number(order.total).toFixed(2)}
</span>


</div>


</div>

);

}