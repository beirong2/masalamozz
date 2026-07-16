"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { getDistanceMiles } from "@/lib/distance";
import { RESTAURANT } from "@/lib/config";
import { useRouter } from "next/navigation";

type AddressSuggestion = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

export default function CheckoutForm() {
  const router = useRouter();
  const { cart, removeItem } = useCart();
  console.log("CURRENT CART:", cart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pickupTime, setPickupTime] = useState("ASAP");
  const [notes, setNotes] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"venmo" | "zelle">("venmo");

  const [errors, setErrors] = useState<{
  name?: string;
  phone?: string;
  address?: string;
}>({});

  const [orderType, setOrderType] =
    useState<"pickup" | "delivery">("pickup");

  const [address, setAddress] = useState("");
  const [addressQuery, setAddressQuery] = useState("");

  const [suggestions, setSuggestions] =
  useState<AddressSuggestion[]>([]);

  const [deliveryAvailable, setDeliveryAvailable] =
    useState(false);

  const [distance, setDistance] = useState(0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

function calculateDeliveryFee(miles: number) {
  if (miles <= 1) return 1.99;
  if (miles <= 2) return 1.99;
  if (miles <= 3) return 2.99;
  if (miles <= 4) return 3.99;
  if (miles <= 5) return 4.99;
  if (miles <= 6) return 5.99;
  if (miles <= 7) return 6.99;
  if (miles <= 8) return 7.99;
  if (miles <= 9) return 8.99;
  if (miles <= 10) return 9.99;

  return 0;
}

  const deliveryFee =
  orderType === "delivery" && deliveryAvailable
    ? calculateDeliveryFee(distance)
    : 0;

  const total = subtotal + deliveryFee;

  const canPlaceOrder =
    cart.length > 0 &&
    (
      orderType === "pickup" ||
      (orderType === "delivery" && deliveryAvailable)
    );

    useEffect(() => {

  
  const timer = setTimeout(() => {

    if (addressQuery.length >= 3) {
      searchAddress(addressQuery);
    } else {
      setSuggestions([]);
    }

  }, 400);


  return () => clearTimeout(timer);

}, [addressQuery]);

    async function searchAddress(value: string) {

        try {

            const response = await fetch(
            `/api/address-search?q=${encodeURIComponent(value)}`
            );


            if (!response.ok) {
            setSuggestions([]);
            return;
            }


            const data = await response.json();

console.log(data);

if (!response.ok) {
  return;
}

            setSuggestions(
            Array.isArray(data) ? data : []
            );


        } catch (error) {

            console.error("Address search failed:", error);
            setSuggestions([]);

        }
        }


  function selectAddress(item: AddressSuggestion) {

    setAddress(item.display_name);
    setSuggestions([]);

    const miles = getDistanceMiles(
      RESTAURANT.lat,
      RESTAURANT.lng,
      Number(item.lat),
      Number(item.lon)
    );

    setDistance(miles);
    setDeliveryAvailable(miles <= 10);
  }


  return (
    <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">

      {/* LEFT */}

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="mb-8 text-4xl font-bold text-[#2E3416]">
          Checkout
        </h1>


        <div className="space-y-6">


          <div>
            <label className="mb-2 block font-medium">
              Name
            </label>

            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prev) => ({ ...prev, name: undefined }));
              }}
              className={`w-full rounded-xl border p-3 ${
                errors.name ? "border-red-500" : ""
              }`}
              placeholder="John Smith"
            />

            {errors.name && (
              <p className="mt-2 text-sm text-red-600">
                {errors.name}
              </p>
            )}
          </div>



          <div>
            <label className="mb-2 block font-medium">
              Phone Number
            </label>

            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                setErrors((prev) => ({ ...prev, phone: undefined }));
              }}
              className={`w-full rounded-xl border p-3 ${
                errors.phone ? "border-red-500" : ""
              }`}
              placeholder="(555) 555-5555"
            />

            {errors.phone && (
              <p className="mt-2 text-sm text-red-600">
                {errors.phone}
              </p>
            )}
          </div>



          <div>

            <label className="mb-3 block font-medium">
              Order Type
            </label>


            <div className="flex gap-4">


              <button
                type="button"
                onClick={()=>setOrderType("pickup")}
                className={`flex-1 rounded-xl border p-4 transition ${
                  orderType === "pickup"
                  ? "border-[#2E3416] bg-[#2E3416] text-white"
                  : "border-stone-300 bg-white"
                }`}
              >
                Pickup
              </button>


              <button
                type="button"
                onClick={()=>setOrderType("delivery")}
                className={`flex-1 rounded-xl border p-4 transition ${
                  orderType === "delivery"
                  ? "border-[#2E3416] bg-[#2E3416] text-white"
                  : "border-stone-300 bg-white"
                }`}
              >
                Delivery
              </button>


            </div>

          </div>



{orderType === "pickup" && (
  <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
    <h3 className="font-semibold text-[#2E3416]">
      Estimated Pickup Time
    </h3>

    <p className="mt-2 text-lg font-bold">
      About 20–30 minutes
    </p>

    <p className="mt-1 text-sm text-stone-500">
      Your exact pickup time will update after your order is confirmed.
    </p>
  </div>
)}



          {orderType === "delivery" && (

            <div>

              <label className="mb-2 block font-medium">
                Delivery Address
              </label>


              <input
                value={address}
                onChange={(e) => {
                    setAddress(e.target.value);
                    setAddressQuery(e.target.value);
                }}
                className="w-full rounded-xl border p-3"
                placeholder="Enter delivery address"
                />



              {suggestions.length > 0 && (

                <div className="mt-2 rounded-xl border">

                  {suggestions.map((item)=>(

                    <div
                      key={item.place_id}
                      onClick={()=>selectAddress(item)}
                      className="cursor-pointer p-3 hover:bg-gray-100"
                    >
                      {item.display_name}
                    </div>

                  ))}

                </div>

              )}



              {distance > 0 && (

                <p
                  className={`mt-3 text-sm ${
                    deliveryAvailable
                    ? "text-green-700"
                    : "text-red-600"
                  }`}
                >

                  {deliveryAvailable
                    ? `Delivery available (${distance.toFixed(1)} miles)`
                    : `Delivery unavailable (${distance.toFixed(1)} miles away)`
                  }

                </p>

              )}

            </div>

          )}

          <div>
            <label className="mb-3 block font-medium">
                Payment Method
            </label>

            <div className="flex gap-4">

                <button
                type="button"
                onClick={() => setPaymentMethod("venmo")}
                className={`flex-1 rounded-xl border p-4 ${
                    paymentMethod === "venmo"
                    ? "border-[#2E3416] bg-[#2E3416] text-white"
                    : "border-stone-300"
                }`}
                >
                Venmo
                </button>


                <button
                type="button"
                onClick={() => setPaymentMethod("zelle")}
                className={`flex-1 rounded-xl border p-4 ${
                    paymentMethod === "zelle"
                    ? "border-[#2E3416] bg-[#2E3416] text-white"
                    : "border-stone-300"
                }`}
                >
                Zelle
                </button>

            </div>
            </div>

          <div>

            <label className="mb-2 block font-medium">
              Special Instructions
            </label>


            <textarea
              rows={4}
              value={notes}
              onChange={(e)=>setNotes(e.target.value)}
              className="w-full rounded-xl border p-3"
              placeholder="No onions, extra spicy..."
            />

          </div>


        </div>

      </div>



      {/* RIGHT */}


      <div className="sticky top-28 h-fit rounded-3xl bg-white p-8 shadow">


        <h2 className="mb-6 text-2xl font-bold text-[#2E3416]">
          Order Summary
        </h2>



        <div className="space-y-4">


          {cart.map((item)=>(

            <div
  key={item.id}
  className="flex items-start justify-between"
>
  <div>
    <p className="font-medium">
{item.signature ??
  `${item.proteins?.[0]?.name ?? "Custom"} Bowl`}
    </p>

    <p className="text-sm text-stone-500">
      Qty {item.quantity}
    </p>

    <button
      type="button"
      onClick={() => removeItem(item.id)}
      className="mt-1 text-sm font-medium text-red-600 hover:text-red-700"
    >
      Remove
    </button>
  </div>

  <p className="font-medium">
    ${(item.price * item.quantity).toFixed(2)}
  </p>
</div>

          ))}


        </div>



        <div className="my-6 border-t"/>



        <div className="space-y-2">


          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>



          {orderType === "delivery" && (

            <div className="flex justify-between">
              <span>Delivery</span>
              <span>${deliveryFee.toFixed(2)}</span>
            </div>

          )}



          <div className="flex justify-between text-xl font-bold">

            <span>Total</span>

            <span>
              ${total.toFixed(2)}
            </span>

          </div>


        </div>

        <button
        type="button"
onClick={async () => {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const newErrors: typeof errors = {};

  if (name.trim().length < 2) {
    newErrors.name = "Please enter your name.";
  }

  if (phone.trim().length < 7) {
    newErrors.phone = "Please enter a valid phone number.";
  }

  if (orderType === "delivery" && !deliveryAvailable) {
    newErrors.address = "Please select a valid delivery address.";
  }

  setErrors(newErrors);

  if (Object.keys(newErrors).length > 0) {
    return;
  }

  const response = await fetch("/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      phone,
      orderType,
      address,
      notes,
      subtotal,
      deliveryFee,
      total,
      paymentMethod,
      cart,
    }),
  });

  const data = await response.json();

  console.log(data);

  if (!response.ok) {
    if (data.details?.fieldErrors) {
      setErrors({
        name: data.details.fieldErrors.name?.[0],
        phone: data.details.fieldErrors.phone?.[0],
        address: data.details.fieldErrors.address?.[0],
      });
    } else {
      alert(data.error ?? "Something went wrong.");
    }

    return;
  }

  localStorage.setItem("currentOrderId", data.order.id);

  router.push(`/payment/${data.order.id}`);
}}
        className="mt-8 block w-full rounded-full bg-[#2E3416] py-4 text-center font-semibold text-white transition hover:bg-[#475226]"
        >
        Continue to Payment
        </button>


      </div>


    </div>
  );
}