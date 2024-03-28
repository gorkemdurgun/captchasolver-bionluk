export default function BlogLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 bg-gradient-to-r from-gray-50 to-gray-100">
      {children}
    </section>
  );
}
