"use client";

type BuildYourOwnModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export default function BuildYourOwnModal({
  open,
  onClose,
  title,
  children,
}: BuildYourOwnModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between border-b px-8 py-6">
          <div>
            <h2 className="text-3xl font-bold text-[#2E3416]">
              {title}
            </h2>

            <p className="mt-2 text-stone-500">
              Customize your order exactly how you want it.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-3 text-2xl transition hover:bg-stone-100"
          >
            ✕
          </button>
        </div>

        {/* Scrollable content */}
        <div className="max-h-[calc(90vh-110px)] overflow-y-auto">
          {children}
        </div>

      </div>
    </div>
  );
}