export default function LaunchSectionLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center w-full gap-4 lg:py-24 md:py-10 bg-red-100">
      <div className="container max-w-7xl">{children}</div>
    </section>
  );
}
