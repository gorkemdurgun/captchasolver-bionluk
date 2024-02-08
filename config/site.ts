export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Next.js + NextUI",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Docs",
      href: "/docs"
    },
    {
      label: "Pricing",
      href: "/pricing"
    },
    {
      label: "Blog",
      href: "/blog"
    },
    {
      label: "About",
      href: "/about"
    }
  ],
  navMenuItems: [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Docs",
      href: "/docs"
    },
    {
      label: "Pricing",
      href: "/pricing"
    },
    {
      label: "Blog",
      href: "/blog"
    },
    {
      label: "About",
      href: "/about"
    },
    {
      label: "Settings",
      href: "/settings"
    },
    {
      label: "Help & Feedback",
      href: "/help-feedback"
    },
    {
      label: "Logout",
      href: "/logout"
    }
  ],
  links: {
    github: "https://github.com",
    docs: "https://nextui.org",
    discord: "https://discord.gg"
  }
};
