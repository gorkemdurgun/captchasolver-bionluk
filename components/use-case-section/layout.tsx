export default function UseCasesSectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 lg:py-12 md:py-4 bg-red-200">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
