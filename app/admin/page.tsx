import { Card } from "@nextui-org/react";
import Link from "next/link";
import {
  PiNewspaperDuotone as BlogsIcon,
  PiFileDuotone as DocsIcon,
  PiTicketDuotone as TicketsIcon
} from "react-icons/pi";

const adminPages = [
  {
    path: "/blogs",
    name: "Blogs",
    icon: BlogsIcon
  },
  {
    path: "/docs",
    name: "Docs",
    icon: DocsIcon
  },
  {
    path: "/tickets",
    name: "Tickets",
    icon: TicketsIcon
  }
];

export default function AdminPage() {
  return (
    <section className="flex flex-col items-center w-full h-full gap-4 lg:py-10 bg-gray-900">
      <div className="container max-w-7xl px-4">
        <h1 className="text-3xl font-bold text-white mb-4">Admin</h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {adminPages.map(page => (
            <Link href={`/admin${page.path}`} key={page.path}>
              <Card className="flex gap-2 p-4 cursor-pointer bg-white hover:shadow-lg">
                <page.icon className="text-4xl text-black" />
                <h2 className="text-xl text-black font-bold">{page.name}</h2>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
