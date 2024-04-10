"use client";
import Image from "next/image";
import LoginLayout from "./layout";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  InputSlots,
  SlotsToClasses
} from "@nextui-org/react";
import { svg } from "@/public/assets";
import Text from "@/components/text";
import Link from "next/link";
import { useAppDispatch } from "@/hooks";
import { login as loginAction } from "@/redux/actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { successToast } from "@/components/toaster";

const styles: SlotsToClasses<InputSlots> = {
  label: "text-white text-lg whitespace-nowrap",
  input: "!text-black pl-4",
  inputWrapper: "max-w-lg !bg-white text-body p-0",
  mainWrapper: "w-full"
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: ""
  });

  function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  }

  function handleLogin() {
    dispatch(
      loginAction.request({
        email: loginForm.email,
        password: loginForm.password,
        onSuccess() {
          router.push("/");
        }
      })
    );
  }

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-start w-full gap-4 px-6 min-h-[100vh]">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p className="text-major flex justify-center text-black text-3xl md:text-5xl">
            LOGIN
          </p>
        </span>
        <Divider />
        <div className="flex flex-col items-center p-4 w-full max-w-4xl bg-gray-900 rounded-lg">
          <div className="flex gap-3 pb-4">
            <div className="flex items-center gap-2">
              <Image
                src={svg.Logo}
                alt="Capsmasher LOGO"
                width={40}
                height={40}
              />
              <p className="font-bold text-inherit">Capsmasher</p>
            </div>
          </div>
          <Divider />
          <div className="flex flex-col items-center gap-4 py-12 w-full max-w-xl">
            <Input
              validate={value => {
                if (!value.includes("@")) {
                  return "Invalid email";
                }
                return "";
              }}
              className="grid grid-cols-[1fr,2fr]"
              classNames={{ inputWrapper: "border border-white" }}
              type="email"
              label="Email"
              name="email"
              value={loginForm.email}
              onChange={handleChangeForm}
              isRequired
              labelPlacement="outside-left"
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              classNames={{ inputWrapper: "border border-white" }}
              type="password"
              label="Password"
              name="password"
              value={loginForm.password}
              onChange={handleChangeForm}
              isRequired
              labelPlacement="outside-left"
            ></Input>
            {/* <div className="flex items-center justify-end w-full ">
              <Button className="bg-gray-100/10">Forgot password</Button>
            </div> */}
            <Button
              className="primary-button w-full bg-red-400 hover:bg-red-600"
              onClick={handleLogin}
            >
              <Text className="font-body text-white text-lg font-bold">
                Login
              </Text>
            </Button>
          </div>
          <Divider />
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            <span>
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-body font-medium text-red-300 text-md m-2 underline"
              >
                Sign Up
              </Link>
            </span>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
}
