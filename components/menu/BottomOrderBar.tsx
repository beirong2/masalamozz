"use client";

interface Props {
  title: string;
  subtitle?: string;
  price: number;

  disabled?: boolean;
  buttonText?: string;

  onAdd: () => void;
}

export default function BottomOrderBar({
  title,
  subtitle,
  price,
  disabled = false,
  buttonText = "Add to Cart",
  onAdd,
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-stone-200 bg-white/95 backdrop-blur-md shadow-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">
            Current Item
          </p>

          <p className="font-semibold text-[#2E3416]">
            {title}
          </p>

          {subtitle && (
            <p className="text-sm text-stone-500">
              {subtitle}
            </p>
          )}
        </div>

        <div className="flex items-center gap-5">
          <span className="text-xl font-bold">
            ${price.toFixed(2)}
          </span>

          <button
            onClick={onAdd}
            disabled={disabled}
            className="rounded-full bg-[#2E3416] px-8 py-3 font-semibold text-white transition hover:bg-[#475226] disabled:opacity-40"
          >
            {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
}