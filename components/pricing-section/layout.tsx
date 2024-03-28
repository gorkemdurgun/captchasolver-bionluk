export default function PricingSectionLayout({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`flex flex-col items-center justify-center w-full gap-4 py-8 lg:py-12 md:py-4 bg-gradient-to-t from-rose-200 via-red-200 to-rose-400 ${className}`}
    >
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
