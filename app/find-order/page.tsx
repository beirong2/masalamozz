"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import OrderCard from "@/components/orders/OrderCard";


export default function FindOrderPage(){
  const supabase = createClient();

const [phone,setPhone]=useState("");
const [email,setEmail]=useState("");

const [orders,setOrders]=useState<any[]>([]);
const [searched,setSearched]=useState(false);
const [tab,setTab]=useState<"active"|"completed">("active");
const [error,setError]=useState("");

const [searchInfo, setSearchInfo] = useState<{
  phone:string;
  email:string;
} | null>(null);



async function findOrders(){

setError("");

const res = await fetch("/api/find-order",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
phone,
email
})
});


const data=await res.json();


if(!data.orders || data.orders.length===0){

setOrders([]);
setError("No orders found.");
setSearched(true);

return;

}


setOrders(data.orders);

setSearchInfo({
  phone,
  email,
});

setSearched(true);

}

useEffect(() => {

const saved = localStorage.getItem("customerLookup");

if(saved){

const customer = JSON.parse(saved);

setPhone(customer.phone);
setEmail(customer.email);

}

}, []);

useEffect(() => {

  if (!searchInfo) return;


  const channel = supabase
    .channel("customer-orders")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "orders",
        filter: `phone=eq.${searchInfo.phone}`,
      },
      (payload) => {

        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === payload.new.id
              ? {
                  ...order,
                  ...payload.new,
                }
              : order
          )
        );

      }
    )
    .subscribe();


  return () => {
    supabase.removeChannel(channel);
  };


}, [searchInfo, supabase]);

const activeOrders =
orders.filter(
o=>o.status !== "completed"
);


const completedOrders =
orders.filter(
o=>o.status === "completed"
);


const shown =
tab==="active"
?activeOrders
:completedOrders;



return (

<main className="min-h-screen bg-[#F8F2E9] px-6 py-10">


<div className="mx-auto max-w-xl">


<h1 className="text-4xl font-bold text-[#2E3416]">
Find My Orders
</h1>



{!searched && (

<div className="mt-8 rounded-3xl bg-white p-8 shadow space-y-4">


<input
className="w-full rounded-xl border p-3"
placeholder="Phone Number"
value={phone}
onChange={e=>setPhone(e.target.value)}
/>


<input
className="w-full rounded-xl border p-3"
placeholder="Email"
value={email}
onChange={e=>setEmail(e.target.value)}
/>



<button
onClick={findOrders}
className="w-full rounded-full bg-[#2E3416] py-4 text-white font-semibold"
>
Find Orders
</button>


</div>

)}



{error && (
<p className="mt-5 text-red-600">
{error}
</p>
)}



{searched && (

<>

<div className="mt-8 flex rounded-full bg-white p-1">


<button
onClick={()=>setTab("active")}
className={`flex-1 rounded-full py-3 ${
tab==="active"
?"bg-[#2E3416] text-white"
:""
}`}
>
Current
</button>



<button
onClick={()=>setTab("completed")}
className={`flex-1 rounded-full py-3 ${
tab==="completed"
?"bg-[#2E3416] text-white"
:""
}`}
>
Completed
</button>


</div>



<div className="mt-6 space-y-6">


{shown.map(order=>(

<OrderCard
key={order.id}
order={order}
/>

))}


</div>


</>

)}



</div>


</main>

);

}