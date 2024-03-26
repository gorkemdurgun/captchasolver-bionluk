"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Input,
  Snippet,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Textarea,
  getKeyValue
} from "@nextui-org/react";
import { useEffect, useState } from "react";
// import { LuArrowUpDown as ExpandIcon } from "react-icons/lu";
import { FaChevronDown as ExpandIcon } from "react-icons/fa6";
import {
  PiPlusBold as AddCreditIcon,
  PiWarningBold as WarningIcon,
  PiKeyDuotone as KeyIcon,
  PiQuestionBold as QuestionIcon,
  PiUser as UserIcon,
  PiEnvelopeSimple as EmailIcon,
  PiLock as PasswordIcon,
  PiIdentificationCard as UserIdIcon,
  PiPencilDuotone as EditIcon,
  PiCalendarBlank as CalendarIcon,
  PiCurrencyDollar as AmountIcon,
  PiTicketDuotone as TicketIcon,
  PiRobotDuotone as AdminIcon,
  PiArrowClockwise as RefreshKeyIcon
} from "react-icons/pi";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { useRouter } from "next/navigation";
import {
  resetClientKey as resetClientKeyAction,
  getUser as getUserAction
} from "@/redux/actions";

const dummyPurchaseData = [
  {
    date: "20 July 2024",
    amount: 50.0,
    credit: 500
  },
  {
    date: "10 August 2024",
    amount: 100.0,
    credit: 1000
  },
  {
    date: "16 September 2023",
    amount: 120.0,
    credit: 1200
  }
];
const dummyTicketData = [
  {
    status: "open",
    subject: "How can I change my password?",
    message:
      "You can change your password by clicking the Edit Information button in the Personal Information section."
  },
  {
    status: "open",
    subject: "How can I change my email address?",
    message:
      "You can change your email address by clicking the Edit Information button in the Personal Information section."
  }
];

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userId, userEmail, cliKey } = useAppSelector(state => ({
    userId: state.auth.user?.userId,
    userEmail: state.auth.user?.email,
    cliKey: state.auth.user?.clientKey
  }));

  const [editMode, setEditMode] = useState(false);
  const [inputEmail, setInputEmail] = useState(userEmail || "");
  const [inputPassword, setInputPassword] = useState("*".repeat(8));
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState(
    "*".repeat(8)
  );

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (editMode) {
      setInputPassword("");
      setInputPasswordConfirm("");
    } else {
      setInputPassword("*".repeat(8));
      setInputPasswordConfirm("*".repeat(8));
    }
  }, [editMode]);

  useEffect(() => {
    dispatch(getUserAction.request());
  }, []);

  return (
    <div className="relative overflow-hidden w-full h-full flex">
      <div className="max-w-7xl w-full flex flex-col mx-auto gap-8 py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8">
        {/* User Info Section */}
        <div className="flex flex-col gap-8">
          <h1 className="text-major text-3xl font-normal text-gray-900 border-b border-gray-200 pb-2">
            User Information
          </h1>
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
            {/* User Info Section - Personal Info */}
            <motion.div
              className="flex flex-col gap-2 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-2/5 min-h-60"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Personal Information
                </span>
              </div>
              <div className="flex flex-col gap-2 pt-2">
                <div className="grid grid-cols-2 items-center justify-between flex-row gap-2 p-2 bg-gray-100 rounded-lg">
                  <span className="flex items-center gap-2 text-body text-sm text-gray-600">
                    <EmailIcon className="w-4 h-4" />
                    Email Address:
                  </span>
                  <span className="text-body text-md text-gray-900">
                    <Input
                      readOnly={!editMode}
                      classNames={{
                        base: "w-full",
                        inputWrapper: `h-8 ${editMode ? "!bg-gray-200" : "!bg-gray-100"}`,
                        input: "!text-gray-900",
                        label: "!text-gray-600"
                      }}
                      value={inputEmail}
                      onChange={e => setInputEmail(e.target.value)}
                    />
                  </span>
                </div>
                <div className="grid grid-cols-2 justify-between flex-row gap-2 p-2 bg-gray-100 rounded-lg">
                  <span className="flex items-center gap-2 text-body text-sm text-gray-600">
                    <PasswordIcon className="w-4 h-4" />
                    Password:
                  </span>
                  <span className="text-body text-md text-gray-900">
                    <Input
                      readOnly={!editMode}
                      type="password"
                      classNames={{
                        base: "w-full",
                        inputWrapper: `h-8 ${editMode ? "!bg-gray-200" : "!bg-gray-100"}`,
                        input: "!text-gray-900",
                        label: "!text-gray-600"
                      }}
                      value={inputPassword}
                      onChange={e => setInputPassword(e.target.value)}
                    />
                  </span>
                </div>
                {editMode && (
                  <div className="grid grid-cols-2 justify-between flex-row gap-2 p-2 bg-gray-100 rounded-lg">
                    <span className="flex items-center gap-2 text-body text-sm text-gray-600">
                      <PasswordIcon className="w-4 h-4" />
                      Confirm Password:
                    </span>
                    <span className="text-body text-md text-gray-900">
                      <Input
                        readOnly={!editMode}
                        type="password"
                        classNames={{
                          base: "w-full",
                          inputWrapper: `h-8 ${editMode ? "!bg-gray-200" : "!bg-gray-100"}`,
                          input: "!text-gray-900",
                          label: "!text-gray-600"
                        }}
                        value={inputPasswordConfirm}
                        onChange={e => setInputPasswordConfirm(e.target.value)}
                      />
                    </span>
                  </div>
                )}
              </div>
              <div className="flex flex-row items-center justify-end gap-2 mt-auto">
                <Button
                  className="bg-yellow-50 text-yellow-900 w-full"
                  onClick={() => setEditMode(!editMode)}
                >
                  <EditIcon />
                  {editMode ? "Cancel Edit Mode" : "Edit Information"}
                </Button>
                <Button
                  disabled={
                    !editMode ||
                    inputPassword !== inputPasswordConfirm ||
                    inputPassword.length < 8
                  }
                  className="bg-green-50 text-green-900 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {}}
                >
                  <EditIcon />
                  Save Information
                </Button>
              </div>
            </motion.div>
            {/* User Info Section - Last Purchasings */}
            <motion.div
              className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-3/5"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Last Purchasings
                </span>
              </div>
              <Table
                classNames={{
                  table: "bg-gray-100 text-gray-900",
                  wrapper: "p-0 shadow-none rounded-lg",
                  th: "bg-gray-300 text-body text-sm font-normal",
                  td: "border-b border-gray-200 py-3 text-body text-md"
                }}
              >
                <TableHeader
                  columns={[
                    {
                      key: "date",
                      label: "Date",
                      icon: <CalendarIcon className="w-4 h-4" />
                    },
                    {
                      key: "amount",
                      label: "Amount",
                      icon: <AmountIcon className="w-4 h-4" />
                    }
                  ]}
                >
                  {column => (
                    <TableColumn key={column.key}>
                      <span className="flex items-center gap-2">
                        {column.icon}
                        {column.label}
                      </span>
                    </TableColumn>
                  )}
                </TableHeader>
                <TableBody items={dummyPurchaseData}>
                  {item => (
                    <TableRow key={item.date}>
                      <TableCell>{getKeyValue(item, "date")}</TableCell>
                      <TableCell>
                        {getKeyValue(
                          `$${item.amount} (${item.credit} credits)`,
                          "amount"
                        )}
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </motion.div>
          </div>
        </div>
        {/* Overview Section */}
        <div className="flex flex-col gap-8">
          <h1 className="text-major text-3xl font-normal text-gray-900 border-b border-gray-200 pb-2">
            Overview
          </h1>
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
            {/* Overview Section - Credit */}
            <motion.div
              className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-2/5 h-60"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Credits
                </span>
                <Button
                  disableRipple
                  className="bg-transparent text-body text-sm text-gray-500 p-0"
                >
                  <AddCreditIcon />
                  Add Credit
                </Button>
              </div>
              <div className="flex items-end justify-between gap-2">
                <span className="text-body text-md text-gray-600">
                  Active Credit
                </span>
                <span className="text-body text-2xl text-gray-900">$ 0.00</span>
              </div>
              <Button
                className="bg-red-50 text-red-900 mt-auto"
                onClick={() => scrollTo("open-ticket-modal")}
              >
                <WarningIcon />
                Do you have any problem?
              </Button>
            </motion.div>
            {/* Overview Section - Client Key */}
            <motion.div
              className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-3/5 h-60"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Client Key
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-start lg:items-end justify-between gap-2">
                <span className="text-body text-md text-gray-600 whitespace-nowrap">
                  Active Key
                </span>
                <Snippet
                  symbol={<KeyIcon className="w-4 h-4" />}
                  className="flex flex-row text-body text-sm text-gray-900 bg-gray-200 py-1"
                  classNames={{
                    pre: "flex flex-row items-center gap-2"
                  }}
                >
                  <span className="max-w-[200px] sm:max-w-[320px] truncate sm:whitespace-nowrap">
                    {cliKey}
                  </span>
                </Snippet>
              </div>
              <div className="flex flex-row items-center justify-end gap-2 mt-auto">
                <Button
                  className="bg-blue-50 text-blue-900 w-full"
                  onClick={() => router.push("/docs" + "?category=0_2")}
                >
                  <QuestionIcon />
                  How can I use this key?
                </Button>
                <Button
                  className="bg-indigo-50 text-indigo-900 w-full"
                  onClick={() => dispatch(resetClientKeyAction.request())}
                >
                  <RefreshKeyIcon />
                  Refresh Key
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
        {/* Tickets Section */}
        <div className="flex flex-col gap-8">
          <h1 className="text-major text-3xl font-normal text-gray-900 border-b border-gray-200 pb-2">
            Tickets
          </h1>
          <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
            {/* Tickets Section - Open Tickets */}
            <motion.div
              className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-1/2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Open Tickets
                </span>
              </div>
              {dummyTicketData.filter(ticket => ticket.status === "open")
                .length > 0 && (
                <Accordion>
                  {dummyTicketData
                    .filter(ticket => ticket.status === "open")
                    .map(ticket => (
                      <AccordionItem
                        key={ticket.subject}
                        classNames={{
                          title: "text-body text-sm text-gray-900"
                        }}
                        title={ticket.subject}
                        indicator={<ExpandIcon className="w-4 h-4 rotate-90" />}
                      >
                        <div className="flex flex-col items-start gap-2 p-2 bg-gray-100 rounded-lg">
                          <span className="flex items-center gap-1 text-body text-sm text-red-500">
                            <AdminIcon className="w-4 h-4" />
                            admin:
                          </span>
                          <span className="text-body text-sm text-gray-900">
                            {ticket.message}
                          </span>
                        </div>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
              {dummyTicketData.filter(ticket => ticket.status === "open")
                .length === 0 && (
                <div className="flex flex-col gap-4 items-center justify-center pt-8">
                  <span className="flex flex-row items-center gap-2 text-body text-sm text-gray-600">
                    <TicketIcon className="w-4 h-4" />
                    Any open ticket found.
                  </span>
                </div>
              )}
            </motion.div>
            {/* Tickets Section - Closed Tickets */}
            <motion.div
              className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-1/2"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                <span className="text-major text-lg font-light text-gray-900">
                  Closed Tickets
                </span>
              </div>
              {dummyTicketData.filter(ticket => ticket.status === "closed")
                .length > 0 && (
                <Accordion>
                  {dummyTicketData
                    .filter(ticket => ticket.status === "closed")
                    .map(ticket => (
                      <AccordionItem
                        key={ticket.subject}
                        classNames={{
                          title: "text-body text-sm text-gray-900"
                        }}
                        title={ticket.subject}
                        indicator={<ExpandIcon className="w-4 h-4 rotate-90" />}
                      >
                        <div className="flex flex-col items-start gap-2 p-2 bg-gray-100 rounded-lg">
                          <span className="flex items-center gap-1 text-body text-sm text-red-500">
                            <AdminIcon className="w-4 h-4" />
                            admin:
                          </span>
                          <span className="text-body text-sm text-gray-900">
                            {ticket.message}
                          </span>
                        </div>
                      </AccordionItem>
                    ))}
                </Accordion>
              )}
              {dummyTicketData.filter(ticket => ticket.status === "closed")
                .length === 0 && (
                <div className="flex flex-col gap-4 items-center justify-center pt-8">
                  <span className="flex flex-row items-center gap-2 text-body text-sm text-gray-600">
                    <TicketIcon className="w-4 h-4" />
                    Any closed ticket found.
                  </span>
                </div>
              )}
            </motion.div>
          </div>
          <motion.div
            id="open-ticket-modal"
            className="flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
              <span className="text-major text-lg font-light text-gray-900">
                Open New Ticket
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <Input
                classNames={{
                  inputWrapper: "!bg-gray-200",
                  input: "!text-gray-900",
                  label: "!text-gray-600"
                }}
                label="Subject"
                placeholder="Enter the subject of the ticket"
              />
              <Textarea
                classNames={{
                  inputWrapper: "!bg-gray-200",
                  input: "!text-gray-900",
                  label: "!text-gray-600"
                }}
                label="Message"
                placeholder="Enter the message of the ticket"
              />
              <div className="flex justify-end mt-2">
                <Button className="bg-green-500 text-green-50 w-full sm:max-w-[200px]">
                  Open Ticket
                  <TicketIcon className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
