"use client";

type Props = {
  amount: number;
  orderId: string;
  username: string;
};

export default function VenmoButton({
  amount,
  orderId,
  username,
}: Props) {
  function handleClick() {
    window.location.href =
      `venmo://paycharge?txn=pay&recipients=${username}&amount=${amount.toFixed(
        2
      )}&note=Order%20${orderId.slice(0, 8)}`;

    setTimeout(() => {
      window.open(
        `https://venmo.com/${username}?txn=pay&amount=${amount.toFixed(
          2
        )}&note=Order%20${orderId.slice(0, 8)}`,
        "_blank"
      );
    }, 700);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-4 w-full rounded-full bg-[#008CFF] py-3 font-semibold text-white hover:opacity-90"
    >
      Pay with Venmo
    </button>
  );
}