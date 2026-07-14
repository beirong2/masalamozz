"use client";

import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
  image: string;
  onClick: () => void;
}

export default function BuildCard({
  title,
  subtitle,
  image,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className="flex w-full overflow-hidden rounded-3xl border border-stone-200 bg-white shadow transition hover:shadow-lg"
    >
      <div className="flex flex-1 flex-col justify-center p-8 text-left">
        <h3 className="text-2xl font-bold text-[#2E3416]">
          {title}
        </h3>

        <p className="mt-3 text-stone-600">
          {subtitle}
        </p>

        <p className="mt-5 font-semibold text-[#C97A17]">
          From $10
        </p>
      </div>

      <div className="relative w-56">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </button>
  );
}