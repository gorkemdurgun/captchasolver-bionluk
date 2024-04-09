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

import {
  PiArrowCircleRight as GoDashboardIcon,
  PiUserDuotone as UserIcon,
  PiGearDuotone as SettingsIcon,
  PiSignOutDuotone as LogoutIcon
} from "react-icons/pi";

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
import { Avatar, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Text from "./text";
import { usePathname, useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/hooks";
import { logout as logoutAction } from "@/redux/actions";

export const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => ({
    user: state.auth.user
  }));

  const [toggle, setToggle] = useState(false);

  function handleLogout() {
    dispatch(logoutAction.request());
    router.push("/");
  }

  return (
    <NextUINavbar
      maxWidth="xl"
      position="sticky"
      isMenuOpen={toggle}
      onMenuOpenChange={setToggle}
    >
      <NavbarContent
        aria-busy="true"
        className="basis-1/5 sm:basis-full"
        justify="start"
      >
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <Image
              src={svg.Logo}
              alt="Capsmasher LOGO"
              width={40}
              height={40}
            />
            <p className="font-bold text-inherit">Capsmasher</p>
          </NextLink>
        </NavbarBrand>
        <ul
          aria-busy="true"
          className="hidden lg:flex gap-4 justify-start ml-2 !list-none"
        >
          {siteConfig.navItems?.map(item => (
            <NavbarItem
              className="!before:hidden !after:hidden"
              key={item.href}
            >
              <span
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium cursor-pointer"
                )}
                color="foreground"
                onClick={() => {
                  router.push(item.href);
                }}
              >
                {item.label}
              </span>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        aria-busy="true"
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {/* <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <ThemeSwitch /> 
        </NavbarItem> */}
        {user ? (
          <NavbarItem className="flex items-center">
            <Button
              className="flex gap-2 items-center bg-gray-100/10 p-2 rounded-full"
              onClick={() => {
                router.push("/dashboard");
                setToggle(false);
              }}
            >
              <UserIcon className="text-md text-white" />
              <span className="text-white text-sm">{user.email}</span>
            </Button>
            <Button
              className="bg-transparent p-0 rounded-full min-w-unit-10"
              onClick={() => {
                handleLogout();
                setToggle(false);
              }}
            >
              <LogoutIcon className="text-lg text-white" />
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button
              className="primary-button border-none bg-white/10 py-2 px-12 hover:bg-white/20"
              onClick={() => {
                router.push("/login");
                setToggle(false);
              }}
            >
              <Text className="text-body text-white text-lg">Sign In</Text>
            </Button>
          </NavbarItem>
        )}
        {/* <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem> */}
      </NavbarContent>
      <NavbarContent
        aria-busy="true"
        className="sm:hidden basis-1 pl-4"
        justify="end"
      >
        {/* <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
          <DiscordIcon className="text-default-500" />
        </Link> */}
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {user ? (
            <div className="flex flex-row items-center gap-2 bg-gray-100/10 p-4 rounded-full">
              <UserIcon className="text-md text-white" />
              <span className="text-white text-sm">{user.email}</span>
              <div className="flex flex-row items-center gap-2 ml-auto">
                <Button
                  className="bg-transparent p-0 rounded-full min-w-unit-10"
                  onClick={() => router.push("/dashboard")}
                >
                  <GoDashboardIcon className="text-lg text-white" />
                </Button>
                <Button
                  className="bg-transparent p-0 rounded-full min-w-unit-10"
                  onClick={handleLogout}
                >
                  <LogoutIcon className="text-lg text-white" />
                </Button>
              </div>
            </div>
          ) : (
            <Button
              className="primary-button border-none bg-white/10 py-2 px-12 hover:bg-white/20"
              onClick={() => router.push("/login")}
            >
              <Text className="text-body text-white text-lg">Sign In</Text>
            </Button>
          )}
          <ul className="flex flex-col gap-2 mt-4">
            {siteConfig.navItems?.map(item => (
              <NavbarMenuItem
                key={item.href}
                onClick={() => {
                  router.push(item.href);
                  setToggle(false);
                }}
              >
                <span className={"pl-4 text-white text-lg cursor-pointer"}>
                  {item.label}
                </span>
              </NavbarMenuItem>
            ))}
          </ul>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
