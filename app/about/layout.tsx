export default function AboutLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-100 gap-4 bg-red-900">
      {children}
    </section>
  );
}
