export default function RegisterLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 lg:py-10  bg-red-200">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
