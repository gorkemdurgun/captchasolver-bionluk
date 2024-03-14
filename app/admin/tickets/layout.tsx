export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 lg:py-10 bg-gray-300">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
