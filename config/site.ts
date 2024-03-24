export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Capsmasher",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    {
      label: "Home",
      href: "/",
      section: "landing-hero-section"
    },
    {
      label: "Documentation",
      href: "/docs",
      section: "landing-docs-section"
    },
    {
      label: "Blog",
      href: "/blog",
      section: "landing-blog-section"
    },
    {
      label: "Pricing",
      href: "/pricing",
      section: "landing-pricing-section"
    },
    {
      label: "Contact",
      href: "/contact",
      section: "landing-contact-section"
    }
  ],
  links: {
    github: "https://github.com",
    docs: "https://nextui.org",
    discord: "https://discord.gg"
  }
};
