"use client";
import Image from "next/image";
import RegisterLayout from "./layout";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Divider,
  Input,
  InputSlots,
  SlotsToClasses
} from "@nextui-org/react";
import { svg } from "@/public/assets";
import Text from "@/components/text";
import Link from "next/link";

import { PiArrowBendDoubleUpLeftBold as BackLoginIcon } from "react-icons/pi";
import { useEffect, useState } from "react";

import { errorToast, successToast } from "@/components/toaster";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { register as registerAction } from "@/redux/actions";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { error } = useAppSelector(state => ({
    error: state.auth.errorMessage
  }));

  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });

  function formValidation() {
    let isValid = true;

    if (registerForm.email === "") {
      isValid = false;
    } else if (registerForm.password === "") {
      isValid = false;
    } else if (registerForm.confirmPassword === "") {
      isValid = false;
    } else if (registerForm.password !== registerForm.confirmPassword) {
      isValid = false;
    } else if (registerForm.password.length < 8) {
      isValid = false;
    } else if (!passwordRegex()) {
      isValid = false;
    } else {
      isValid = true;
    }

    return isValid;
  }

  function handleChangeForm(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  }

  function passwordRegex() {
    // Password should contain at least one uppercase, one lowercase, one number, and can include special characters
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{0,}$/;
    return regex.test(registerForm.password);
  }

  function handleRegister() {
    dispatch(
      registerAction.request({
        email: registerForm.email,
        password: registerForm.password,
        onSuccess: () => {
          router.push("/");
        }
      })
    );
  }

  return (
    <RegisterLayout>
      <div className="flex flex-col items-center justify-start w-full gap-4 px-6 min-h-[100vh]">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r mb-7 from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <p
            className="text-major flex justify-center text-black text-3xl md:text-5xl"
            onClick={() => successToast("reg successful")}
          >
            REGISTER
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
              className="grid grid-cols-[1fr,2fr]"
              classNames={{ inputWrapper: "border border-white" }}
              type="email"
              label="Email"
              name="email"
              isRequired
              labelPlacement="outside-left"
              value={registerForm.email}
              onChange={handleChangeForm}
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              classNames={{ inputWrapper: "border border-white" }}
              type="password"
              label="Password"
              name="password"
              isRequired
              labelPlacement="outside-left"
              value={registerForm.password}
              onChange={handleChangeForm}
            ></Input>
            <Input
              className="grid grid-cols-[1fr,2fr]"
              classNames={{ inputWrapper: "border border-white" }}
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              isRequired
              labelPlacement="outside-left"
              value={registerForm.confirmPassword}
              onChange={handleChangeForm}
            ></Input>
            <div className="w-full flex flex-col items-start gap-2 my-2">
              <Checkbox
                isReadOnly
                isSelected={registerForm.email !== ""}
                color="default"
                classNames={{ label: "text-sm" }}
              >
                Email must not be empty
              </Checkbox>
              <Checkbox
                isReadOnly
                isSelected={registerForm.password.length >= 8}
                color="default"
                classNames={{ label: "text-sm" }}
              >
                Password must be at least 8 characters
              </Checkbox>
              <Checkbox
                isReadOnly
                isSelected={passwordRegex()}
                color="default"
                classNames={{ label: "text-sm" }}
              >
                Password must contain uppercase, lowercase, number
              </Checkbox>
              <Checkbox
                isReadOnly
                isSelected={
                  registerForm.password === registerForm.confirmPassword &&
                  registerForm.password !== ""
                }
                color="default"
                classNames={{ label: "text-sm" }}
              >
                Password must match with confirm password
              </Checkbox>
            </div>
            <Button
              disabled={!formValidation()}
              className="primary-button  w-full bg-red-400 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRegister}
            >
              <Text className="font-body text-white text-lg font-bold">
                Sign Up
              </Text>
            </Button>
          </div>
          <Divider />
          <div className="flex flex-col justify-center items-center gap-4 pt-4">
            <span>
              Already have an account?
              <Link
                href="/login"
                className="text-body font-medium text-red-300 text-md m-2 underline"
              >
                Login
              </Link>
            </span>
          </div>
        </div>
      </div>
    </RegisterLayout>
  );
}
