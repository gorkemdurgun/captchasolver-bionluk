export default function ContactSectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 py-8 lg:py-12 md:py-4 bg-gradient-to-t from-rose-900 via-red-200 to-rose-200">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
