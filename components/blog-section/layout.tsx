export default function BlogSectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 lg:py-12 md:py-4 bg-gradient-to-b from-rose-400  via-rose-100 to-rose-100">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
