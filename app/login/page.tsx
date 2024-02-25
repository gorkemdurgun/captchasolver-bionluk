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
import { login } from "@/redux/actions";

const styles: SlotsToClasses<InputSlots> = {
  label: "text-white text-lg whitespace-nowrap",
  input: "!text-black pl-4",
  inputWrapper: "max-w-lg !bg-white text-body p-0",
  mainWrapper: "w-full"
};

export default function LoginPage() {
  const dispatch = useAppDispatch();

  function handleLogin() {
    dispatch(
      login.request({
        email: "gowosa@gowomail.com",
        password: "Gowosa1."
      })
    );

    /*
    fetch('https://dummyjson.com/posts/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Post add TRIES G!',
        userId: 5,
      })
    })
    .then(res => res.json())
    .then(console.log);
    */
  }

  return (
    <LoginLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 px-6 ">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p className="text-major flex justify-center text-black text-3xl md:text-5xl">
            LOGIN
          </p>
        </span>
        <Divider />
        <Card className="flex items-center w-full max-w-4xl bg-gray-900">
          <CardHeader className="flex gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={svg.Logo}
                alt="Capsmasher LOGO"
                width={40}
                height={40}
              />
              <p className="font-bold text-inherit">Capsmasher</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody className="flex items-center gap-4 py-12 w-full max-w-xl">
            <Input
              validate={value => {
                if (!value.includes("@")) {
                  return "Invalid email";
                }
                return "";
              }}
              className="grid grid-cols-[1fr,2fr]"
              type="email"
              label="Email"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              type="password"
              label="Password"
              isRequired
              classNames={styles}
              labelPlacement="outside-left"
            ></Input>
            <div className="flex items-center justify-end w-full ">
              <Button className="bg-gray-100/10">Forgot password</Button>
            </div>
            <Button
              className="primary-button w-full bg-red-400 hover:bg-red-600"
              onClick={handleLogin}
            >
              <Text className="font-body text-white text-lg font-bold">
                Login
              </Text>
            </Button>
          </CardBody>
          <Divider />
          <CardFooter className="flex flex-col justify-center items-center gap-4 bg-gray-800">
            <span>
              Don&apos;t have an account?
              <Link
                href="/register"
                className="text-body font-medium text-red-300 text-md m-2 underline"
              >
                Sign Up
              </Link>
            </span>
          </CardFooter>
        </Card>
      </div>
    </LoginLayout>
  );
}
