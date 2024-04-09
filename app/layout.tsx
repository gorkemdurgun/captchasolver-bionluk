import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import {
  PiEnvelopeSimple as EmailIcon,
  PiPhone as PhoneIcon,
  PiGithubLogo as GithubIcon
} from "react-icons/pi";
import { Divider } from "@nextui-org/react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png"
  }
};

const footerLinks: {
  title: string;
  links: {
    icon?: React.ElementType;
    title: string;
    href: string;
  }[];
}[] = [
  {
    title: "Quick Access",
    links: [
      { title: "Home", href: "/" },
      { title: "Documentation", href: "/docs" },
      { title: "Blog", href: "/blog" },
      { title: "Pricing", href: "/pricing" },
      { title: "Contact", href: "/contact" }
    ]
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" }
    ]
  },
  {
    title: "Support",
    links: [
      { title: "Help", href: "/help" },
      { title: "FAQ", href: "/faq" }
    ]
  },
  {
    title: "Contact",
    links: [
      {
        icon: EmailIcon,
        title: "Email",
        href: "mailto:capsmasher@info.com"
      },
      {
        icon: PhoneIcon,
        title: "Phone",
        href: "tel:+1234567890"
      }
    ]
  },
  {
    title: "Social",
    links: [{ icon: GithubIcon, title: "Github", href: "https://github.com" }]
  }
];

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://cdn.sellix.io/static/css/embed.css"
          rel="stylesheet"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#c3013e" />
        <meta name="msapplication-TileColor" content="#c3013e" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="w-full mx-auto flex-grow">{children}</main>
            <footer className="relative w-full flex items-start justify-center border-t bg-white">
              <h1 className="absolute -top-4 lg:-top-2 left-0 right-0 tracking-widest text-[50px] sm:text-[60px] text-major text-center text-rose-700 drop-shadow-lg">
                {siteConfig.name.toUpperCase()}
              </h1>
              <div className="max-w-7xl w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-16 lg:pt-20 pb-8 px-4 xl:px-0">
                {footerLinks.map((section, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <h3 className="text-body text-lg font-semibold text-black">
                      {section.title}
                    </h3>
                    <div className="flex flex-col gap-2">
                      {section.links.map((link, index) => (
                        <Link
                          key={index}
                          href={link.href}
                          className="flex items-center gap-2 text-gray-500"
                        >
                          {link?.icon && <link.icon />}
                          <a className="text-body">{link.title}</a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
