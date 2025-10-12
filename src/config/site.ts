export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sistem Manajemen Ternak Ayam Broiler",
  description:
    "Sistem manajemen untuk peternakan ayam broiler yang efisien dan modern.",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
  ],
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Kandang",
      href: "/kandang",
    },
    {
      label: "Pakan",
      href: "/pakan",
    },
    {
      label: "Kesehatan",
      href: "/kesehatan",
    },
    {
      label: "Laporan",
      href: "/laporan",
    },
    {
      label: "Pengaturan",
      href: "/settings",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
