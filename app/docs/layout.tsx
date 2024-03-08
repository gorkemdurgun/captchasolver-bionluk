export default function DocsLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 bg-white">
      {children}
    </section>
  );
}
