"use client";

import Image from "next/image";

interface Props {
  name: string;
  description: string;
  price: number;
  image: string;
  onAdd: () => void;
  onSelect: () => void;
}

export default function SignatureCard({
  name,
  description,
  price,
  image,
  onAdd,
  onSelect,
}: Props) {
  return (
    <div   onClick={onSelect}className="overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-56 w-full bg-stone-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-[#2E3416]">
          {name}
        </h3>

        <p className="mt-3 text-sm leading-6 text-stone-600">
          {description}
        </p>

        <div className="mt-6 flex items-center justify-between">
          <span className="text-xl font-bold text-[#C68420]">
            ${price.toFixed(2)}
          </span>

<button
  className="rounded-full bg-[#2E3416] px-5 py-2 text-white font-semibold hover:bg-[#475226]"
  onClick={(e) => {
    e.stopPropagation();
    onAdd();
  }}
>
  Add
</button>
        </div>
      </div>
    </div>
  );
}