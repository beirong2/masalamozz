interface Props {
  step: number;
  title: string;
  children: React.ReactNode;
}

export default function MenuSection({
  step,
  title,
  children,
}: Props) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2E3416] font-bold text-white">
          {step}
        </div>

        <div>
          <p className="text-sm uppercase tracking-widest text-[#C68420]">
            Step {step}
          </p>

          <h2 className="text-2xl font-bold text-[#2E3416]">
            {title}
          </h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {children}
      </div>
    </section>
  );
}