"use client";

import { Button, Card, Divider, Input, Textarea } from "@nextui-org/react";
import Text from "../text";
import ContactSectionLayout from "./layout";

import {
  PiDotDuotone as PiMatterIcon,
  PiMapPinDuotone as AddressIcon,
  PiPhoneDuotone as PhoneIcon,
  PiEnvelopeSimpleDuotone as MailIcon,
  PiClockDuotone as ClockIcon
} from "react-icons/pi";
import { useState } from "react";
import { sendContactForm } from "@/services/tickets";
import { successToast } from "../toaster";

type Props = {
  layoutClassName?: string;
};

export const ContactSection = ({ layoutClassName }: Props) => {
  const [contactForm, setContactForm] = useState({
    fullName: "",
    email: "",
    subject: "",
    content: ""
  });

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };
  const handleContactFormSubmit = () => {
    sendContactForm(contactForm).then(response => {
      successToast("Message sent successfully");
      setContactForm({
        fullName: "",
        email: "",
        subject: "",
        content: ""
      });
    });
  };

  return (
    <ContactSectionLayout className={layoutClassName}>
      <div
        id="landing-contact-section"
        className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10"
      >
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <Text className="text-major text-black text-3xl md:text-5xl">
            CONTACT US
          </Text>
        </span>
        <Text className="text-body text-black text-md text-center lg:text-xl">
          We are here to help you with any questions or concerns you may have.
          Do you have a question about our services or products? Please fill out
          the form below and we will get back to you as soon as possible. We
          look forward to hearing from you!
        </Text>
        <Divider className="w-full my-4" />
        <Card className="grid w-full lg:gap-4 gap-8 lg:mt-32 lg:p-8 p-4 md:grid-cols-2 grid-cols-1 bg-white overflow-visible">
          <div className="flex flex-col items-start justify-between gap-4">
            <Text className="text-major text-black text-2xl font-thin">
              Contact Information
            </Text>
            <div className="flex flex-col gap-4">
              <span className="flex items-center gap-2">
                <AddressIcon className="text-2xl text-black" />
                <Text className="text-major text-black text-lg font-thin">
                  Address
                </Text>
                <Text className="text-body text-black text-md">
                  Suite 200, New York, NY 10001
                </Text>
              </span>
              <span className="flex items-center gap-2">
                <PhoneIcon className="text-2xl text-black" />
                <Text className="text-major text-black text-lg font-thin">
                  Phone
                </Text>
                <Text className="text-body text-black text-md">
                  +1 123 456 7890
                </Text>
              </span>
              <span className="flex items-center gap-2">
                <MailIcon className="text-2xl text-black" />
                <Text className="text-major text-black text-lg font-thin">
                  Email
                </Text>
                <Text className="text-blue-500">temp-034219412p@gmail.com</Text>
              </span>
              <span className="flex items-center gap-2">
                <ClockIcon className="text-2xl text-black" />
                <Text className="text-major text-black text-lg font-thin">
                  Hours
                </Text>
                <Text className="text-body text-black text-md">
                  Mon - Fri: 9:00 AM - 6:00 PM
                </Text>
              </span>
            </div>
            <Text className="text-body text-gray-700 text-sm">
              We are here to help you with any questions or concerns you may
              have. Do you have a question about our services or products?
              Please fill out the form below and we will get back to you as soon
              as possible. We look forward to hearing from you!
            </Text>
          </div>
          <Card className="flex flex-col items-center justify-center gap-4 lg:p-8 p-4 bg-white lg:-mt-32 -mt-0 lg:-mb-0 -mb-12">
            <Text className="text-major text-black text-2xl font-thin">
              Send us a message
            </Text>
            <div className="flex flex-col gap-4 w-full">
              <Input
                className="w-full"
                classNames={{
                  inputWrapper: "!bg-gray-100",
                  input: "!text-black",
                  label: "!text-gray-700"
                }}
                label="Full Name"
                placeholder="John Doe"
                name="fullName"
                value={contactForm.fullName}
                onChange={handleContactFormChange}
              />
              <Input
                className="w-full"
                classNames={{
                  inputWrapper: "!bg-gray-100",
                  input: "!text-black",
                  label: "!text-gray-700"
                }}
                label="Email"
                placeholder="example@gmail.com"
                name="email"
                value={contactForm.email}
                onChange={handleContactFormChange}
              />
              <Input
                className="w-full"
                classNames={{
                  inputWrapper: "!bg-gray-100",
                  input: "!text-black",
                  label: "!text-gray-700"
                }}
                label="Subject"
                placeholder="Subject"
                name="subject"
                value={contactForm.subject}
                onChange={handleContactFormChange}
              />
              <Textarea
                className="w-full"
                classNames={{
                  inputWrapper: "!bg-gray-100",
                  input: "!text-black",
                  label: "!text-gray-700"
                }}
                label="Message"
                placeholder="Your message here"
                name="content"
                value={contactForm.content}
                onChange={handleContactFormChange}
              />
              <Button
                className="w-full bg-black py-6"
                onClick={handleContactFormSubmit}
              >
                <Text className="text-body text-white text-lg font-thin">
                  Send Message
                </Text>
              </Button>
            </div>
          </Card>
        </Card>
      </div>
    </ContactSectionLayout>
  );
};
