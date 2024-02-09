"use client";

import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { PiCaretCircleRightDuotone as GoDashboardIcon } from "react-icons/pi";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon
} from "@/components/icons";

import { Logo } from "@/components/icons";
import Image from "next/image";
import { svg } from "@/public/assets";
import { User } from "@nextui-org/react";
import { useState } from "react";
import Text from "./text";

export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm"
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src={svg.Logo}
              alt="CAPTCHASOLVER LOGO"
              width={40}
              height={40}
            />
            <p className="font-bold text-inherit">CAPTCHASOLVER</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map(item => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium"
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <ThemeSwitch /> 
        </NavbarItem> */}
        {isAuthenticated ? (
          <NavbarItem className="flex gap-2 items-center">
            <User
              className="text-body text-white font-bold"
              name="Luisa Morris"
              avatarProps={{
                className: "rounded-2xl border-2 w-8 h-8",
                src: "https://i.pravatar.cc/150?u=a04258114e29026702d"
              }}
            />
            <Button
              className="bg-transparent p-0 hover:bg-gray-800 min-w-unit-12"
              onClick={() => setIsAuthenticated(false)}
            >
              <GoDashboardIcon className="text-xl text-white" />
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              className="primary-button border-none bg-white/10 py-2 px-12 hover:bg-white/20"
              onClick={() => setIsAuthenticated(true)}
            >
              <Text className="text-body text-white text-lg">Sign In</Text>
            </Button>
          </NavbarItem>
        )}
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
          <DiscordIcon className="text-default-500" />
        </Link> */}
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
