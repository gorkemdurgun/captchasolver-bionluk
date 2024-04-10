"use client";

import {
  Accordion,
  AccordionItem,
  Button,
  Card,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
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
  getUser as getUserAction,
  addCredit
} from "@/redux/actions";
import {
  addMessageToTicket,
  createNewTicket,
  editTicketStatus,
  getUserTickets
} from "@/services/tickets";
import toast from "react-hot-toast";
import { Dater } from "@/utils/Dater";
import { errorToast, successToast } from "@/components/toaster";
import { resetPasswordService } from "@/services/auth";

import {
  MdOutlineReply as ReplyIcon,
  MdClose as CloseIcon
} from "react-icons/md";
import { getUserPayments } from "@/services/payments";
import { it } from "node:test";

export default function DashboardPage() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { userId, userEmail, cliKey, balance } = useAppSelector(state => ({
    userId: state.auth.user?.userId,
    userEmail: state.auth.user?.email,
    cliKey: state.auth.user?.clientKey,
    balance: state.auth.user?.balance
  }));

  const [resetKeyModalOpen, setResetKeyModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputEmail, setInputEmail] = useState(userEmail || "");
  const [inputPassword, setInputPassword] = useState("*".repeat(8));
  const [inputPasswordConfirm, setInputPasswordConfirm] = useState(
    "*".repeat(8)
  );
  const [ticketForm, setTicketForm] = useState({
    subject: "",
    message: ""
  });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketReply, setTicketReply] = useState("");
  const [addCreditModalOpen, setAddCreditModalOpen] = useState(false);
  const [addCreditAmount, setAddCreditAmount] = useState("");
  const [lastPayments, setLastPayments] = useState<Payment[]>([]);

  const scrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleChangeTicketForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTicketForm({
      ...ticketForm,
      [e.target.name]: e.target.value
    });
  };
  const handleOpenTicket = () => {
    createNewTicket(ticketForm).then(response => {
      successToast("Ticket opened successfully.");
      setTicketForm({
        subject: "",
        message: ""
      });
      getUserTickets().then(response => {
        setTickets(response.data.tickets);
      });
    });
  };

  const handleChangePassword = () => {
    resetPasswordService(inputPassword, inputPasswordConfirm)
      .then(response => {
        successToast("Password changed successfully.");
        setEditMode(false);
      })
      .catch(error => {
        toast.error(
          "An error occurred while changing the password. Passwords must be at least 8 characters long and must match."
        );
      });
  };

  function handleChangeAmount(e: React.ChangeEvent<HTMLInputElement>) {
    if (parseInt(e.target.value) < 0) {
      setAddCreditAmount("0");
    } else {
      setAddCreditAmount(e.target.value);
    }
  }

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
    getUserTickets().then(response => {
      setTickets(response.data.tickets);
    });
    getUserPayments().then(response => {
      setLastPayments(response.data.payments);
    });
  }, []);

  return (
    <>
      <Modal
        isOpen={resetKeyModalOpen}
        onClose={() => setResetKeyModalOpen(false)}
      >
        <ModalContent className="p-4 bg-white rounded-lg shadow-lg text-gray-900">
          <ModalHeader>Are you sure to reset your client key?</ModalHeader>
          <ModalBody>
            <p className="text-body text-sm">
              If you reset your client key, you will lose your current key and
              the key will be changed. You must wait 10 minutes to do this
              operation again. Are you sure to reset your client key?
            </p>
            <div className="flex flex-row items-center justify-end gap-2 mt-4">
              <Button
                className="bg-red-50 text-red-900"
                onClick={() => setResetKeyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-50 text-green-900"
                onClick={() => {
                  dispatch(resetClientKeyAction.request());
                  setResetKeyModalOpen(false);
                }}
              >
                Reset Key
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal
        backdrop="opaque"
        isOpen={addCreditModalOpen}
        onClose={() => setAddCreditModalOpen(false)}
      >
        <ModalContent className="p-4 bg-white rounded-lg shadow-lg text-gray-900">
          <ModalHeader>Add Credit</ModalHeader>
          <ModalBody>
            <p className="text-body text-sm">
              You can add credit to your account by entering the amount you want
              to add. Please enter the amount you want to add below.
            </p>
            <Input
              type="number"
              label="Amount"
              placeholder="Enter the amount you want to add"
              value={addCreditAmount}
              onChange={handleChangeAmount}
            />
            <div className="flex flex-row items-center justify-end gap-2 mt-4">
              <Button
                className="bg-red-50 text-red-900"
                onClick={() => setAddCreditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-green-50 text-green-900"
                onClick={() => {
                  dispatch(
                    addCredit.request({ amount: parseInt(addCreditAmount) })
                  );
                }}
              >
                Add Credit
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
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
                className="flex flex-col gap-2 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-3/5 min-h-60"
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
                        disabled
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
                        New Password:
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
                          onChange={e =>
                            setInputPasswordConfirm(e.target.value)
                          }
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
                    disabled={!editMode}
                    className="bg-green-50 text-green-900 w-full disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleChangePassword}
                  >
                    <EditIcon />
                    Save Information
                  </Button>
                </div>
              </motion.div>
              {/* User Info Section - Last Purchasings */}
              <motion.div
                className="lg:flex flex-col gap-4 p-4 bg-gray-50 border border-gray-100 shadow-lg rounded-lg w-full lg:w-2/5"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-2 h-[50px]">
                  <span className="text-major text-lg font-light text-gray-900">
                    Last Purchasings
                  </span>
                </div>
                {lastPayments && lastPayments.length > 0 && (
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
                    <TableBody items={lastPayments}>
                      {item => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {getKeyValue(
                              Dater.toLocaleDate(item?.created_at),
                              "date"
                            )}
                          </TableCell>
                          <TableCell>
                            {getKeyValue(`$${item.total}`, "amount")}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                )}
                {lastPayments && lastPayments.length === 0 && (
                  <div className="flex flex-col gap-4 items-center justify-center py-4">
                    <span className="flex flex-row items-center gap-2 text-body text-sm text-gray-600">
                      <TicketIcon className="w-4 h-4" />
                      Any purchase found.
                    </span>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
          {/* Overview Section */}
          <div className="flex flex-col gap-8">
            <h1 className="text-major text-3xl font-normal text-gray-900 border-b border-gray-200 pb-2">
              Overview
            </h1>
            <div className="flex flex-col gap-4 sm:gap-8 lg:flex-row">
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
                    onClick={() => router.push("/docs" + "?category=0_0")}
                  >
                    <QuestionIcon />
                    How can I use this key?
                  </Button>
                  <Button
                    className="bg-indigo-50 text-indigo-900 w-full"
                    onClick={() => setResetKeyModalOpen(true)}
                  >
                    <RefreshKeyIcon />
                    Refresh Key
                  </Button>
                </div>
              </motion.div>
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
                    onClick={() => setAddCreditModalOpen(true)}
                  >
                    <AddCreditIcon />
                    Add Credit
                  </Button>
                </div>
                <div className="flex items-end justify-between gap-2">
                  <span className="text-body text-md text-gray-600">
                    Active Credit
                  </span>
                  <span className="text-body text-2xl text-gray-900">
                    ${balance}
                  </span>
                </div>
                <Button
                  className="bg-red-50 text-red-900 mt-auto"
                  onClick={() => {
                    scrollTo("open-ticket-modal");
                    toast(
                      "Please open a ticket for your problem or question. Our team will help you as soon as possible.",
                      {
                        duration: 10000,
                        position: "bottom-center"
                      }
                    );
                  }}
                >
                  <WarningIcon />
                  Do you have any problem?
                </Button>
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
                {tickets?.filter(ticket => ticket.status === "pending").length >
                  0 && (
                  <Accordion>
                    {tickets
                      ?.filter(ticket => ticket.status === "pending")
                      ?.map(ticket => (
                        <AccordionItem
                          key={ticket.id}
                          classNames={{
                            title: "text-body text-sm text-gray-900"
                          }}
                          title={ticket.subject}
                          indicator={
                            <ExpandIcon className="w-4 h-4 rotate-90" />
                          }
                        >
                          {ticket?.messages?.map((message, index) => (
                            <div
                              key={index}
                              className={`w-full flex text-start gap-4 p-2 border-b bg-transparent  ${
                                message.senderEmail !==
                                "development@capsmasher.com"
                                  ? "text-gray-800"
                                  : "text-blue-800"
                              }`}
                            >
                              {message.senderEmail !==
                              "development@capsmasher.com" ? (
                                <UserIcon className="w-4 h-4 text-gray-800" />
                              ) : (
                                <AdminIcon className="w-4 h-4 text-blue-800" />
                              )}
                              <div>
                                <p>{message.message}</p>
                                <small>
                                  {Dater.timeAgo(message.timestamp)}
                                </small>
                              </div>
                            </div>
                          ))}
                          <div className="flex flex-row items-center justify-end gap-2 mt-2">
                            <Input
                              type="text"
                              placeholder="Your reply"
                              value={ticketReply}
                              onChange={e => setTicketReply(e.target.value)}
                            />
                            <Button
                              onClick={() =>
                                ticket &&
                                addMessageToTicket(
                                  parseInt(ticket.id),
                                  ticketReply
                                )
                                  .then(() => {
                                    successToast("Reply sent successfully.");
                                    getUserTickets().then(response => {
                                      setTickets(response.data.tickets);
                                    });
                                    setTicketReply("");
                                  })
                                  .catch(error => {
                                    errorToast(
                                      "An error occurred while sending the reply."
                                    );
                                  })
                              }
                            >
                              Reply
                            </Button>
                            <Button
                              color="danger"
                              onClick={() =>
                                editTicketStatus(parseInt(ticket.id), "closed")
                                  .then(() => {
                                    successToast("Ticket closed successfully.");
                                    getUserTickets().then(response => {
                                      setTickets(response.data.tickets);
                                    });
                                  })
                                  .catch(error => {
                                    errorToast(
                                      "An error occurred while closing the ticket."
                                    );
                                  })
                              }
                            >
                              Close Ticket
                            </Button>
                          </div>
                        </AccordionItem>
                      ))}
                  </Accordion>
                )}
                {(!tickets ||
                  tickets?.filter(ticket => ticket.status === "pending")
                    ?.length === 0) && (
                  <div className="flex flex-col gap-4 items-center justify-center py-4">
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
                {tickets?.filter(ticket => ticket.status === "closed")?.length >
                  0 && (
                  <Accordion>
                    {tickets
                      ?.filter(ticket => ticket.status === "closed")
                      ?.map(ticket => (
                        <AccordionItem
                          key={ticket.id}
                          classNames={{
                            title: "text-body text-sm text-gray-900"
                          }}
                          title={ticket.subject}
                          indicator={
                            <ExpandIcon className="w-4 h-4 rotate-90" />
                          }
                        >
                          <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-lg shadow-lg">
                            {ticket?.messages?.map((message, index) => (
                              <div
                                key={index}
                                className={`w-full flex text-start gap-4 p-2 border-b bg-transparent  ${
                                  message.senderEmail !==
                                  "development@capsmasher.com"
                                    ? "text-gray-800"
                                    : "text-blue-800"
                                }`}
                              >
                                {message.senderEmail !==
                                "development@capsmasher.com" ? (
                                  <UserIcon className="w-4 h-4 text-gray-800" />
                                ) : (
                                  <AdminIcon className="w-4 h-4 text-blue-800" />
                                )}
                                <div>
                                  <p>{message.message}</p>
                                  <small>
                                    {Dater.timeAgo(message.timestamp)}
                                  </small>
                                </div>
                              </div>
                            ))}
                          </div>
                        </AccordionItem>
                      ))}
                  </Accordion>
                )}
                {(!tickets ||
                  tickets?.filter(ticket => ticket.status === "closed")
                    ?.length === 0) && (
                  <div className="flex flex-col gap-4 items-center justify-center py-4">
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
                  name="subject"
                  label="Subject"
                  placeholder="Enter the subject of the ticket"
                  value={ticketForm.subject}
                  onChange={handleChangeTicketForm}
                />
                <Textarea
                  classNames={{
                    inputWrapper: "!bg-gray-200",
                    input: "!text-gray-900",
                    label: "!text-gray-600"
                  }}
                  name="message"
                  label="Message"
                  placeholder="Enter the message of the ticket"
                  value={ticketForm.message}
                  onChange={handleChangeTicketForm}
                />
                <div className="flex justify-end mt-2">
                  <Button
                    className="bg-green-500 text-green-50 w-full sm:max-w-[200px]"
                    onClick={handleOpenTicket}
                  >
                    Open Ticket
                    <TicketIcon className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
