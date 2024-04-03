"use client";

import { Button } from "@nextui-org/button";

import { useEffect, useState } from "react";

import {
  Card,
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue
} from "@nextui-org/react";

import {
  PiChatCircleDotsDuotone as FromUserIcon,
  PiAndroidLogoDuotone as FromAdminIcon
} from "react-icons/pi";
import {
  MdGridOn,
  MdOutlineReply as ReplyIcon,
  MdClose as CloseIcon
} from "react-icons/md";
import { getContactForms, getTickets } from "@/services/tickets";

export default function AdminPage() {
  const initialTickets: {
    id: string;
    userId: string;
    topic: string;
    description: string;
    status: "open" | "closed";
    createdAt: string;
    comments?: {
      userId: string;
      content: string;
      createdAt: string;
    }[];
  }[] = [
    {
      id: "1",
      userId: "1",
      topic: "Payment issue",
      description:
        "I don't like this service. I want my money back. Can I get a refund?",
      status: "open",
      createdAt: "2021-10-01T12:00:00Z",
      comments: [
        {
          userId: "2",
          content: "Sorry, we don't offer refunds.",
          createdAt: "2021-10-01T12:30:00Z"
        }
      ]
    },
    {
      id: "2",
      userId: "2",
      topic: "Feature request",
      description:
        "I would like to request a feature to be able to change the color of the text in the editor.",
      status: "closed",
      createdAt: "2021-10-02T12:00:00Z",
      comments: [
        {
          userId: "1",
          content: "We have added this feature.",
          createdAt: "2021-10-02T12:30:00Z"
        }
      ]
    }
  ];

  const [filters, setFilters] = useState<string[]>(["open", "closed"]);
  const [gridView, setGridView] = useState<boolean>(false);
  const [openReplyId, setOpenReplyId] = useState<string | null>(null);
  const [replyValue, setReplyValue] = useState<string>("");
  const [tickets, setTickets] = useState<Ticket[]>();
  const [contactFormList, setContactFormList] = useState<ContactForm[]>();

  function handleAddReply(ticketId: string, content: string) {
    // const newTickets = tickets.map(ticket => {
    //   if (ticket.id === ticketId) {
    //     ticket.comments?.push({
    //       userId: "2",
    //       content: content,
    //       createdAt: new Date().toISOString()
    //     });
    //   }
    //   return ticket;
    // });
    // setTickets(newTickets);
    setReplyValue("");
    setOpenReplyId(null);
  }
  function onClickFilter(filter: string) {
    if (filters.includes(filter)) {
      setFilters(filters.filter(f => f !== filter));
    } else {
      setFilters([...filters, filter]);
    }
  }
  function onSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const search = e.target.value;
    const newTickets = initialTickets.filter(ticket =>
      ticket.topic.toLowerCase().includes(search.toLowerCase())
    );
    // setTickets(newTickets);
  }
  function formatTimeToAgo(time: string) {
    const date = new Date(time);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""} ago`;
    } else if (months > 0) {
      return `${months} month${months > 1 ? "s" : ""} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""} ago`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
    }
  }

  useEffect(() => {
    getTickets().then(response => {
      setTickets(response.data);
    });
    getContactForms().then(res => setContactFormList(res.data));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl rounded-sm">
      <h1 className="text-3xl font-bold">Tickets & Contact Forms</h1>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex justify-start w-full gap-4">
          <Input
            className="w-full"
            placeholder="Search by topic"
            onChange={onSearchChange}
          />
          <Button
            size="sm"
            aria-checked={gridView}
            className="h-100 border-2 border-gray-300 bg-transparent text-gray-300 aria-checked:bg-white"
            onClick={() => setGridView(!gridView)}
          >
            <MdGridOn className="text-xl" />
          </Button>
          <Button
            aria-checked={filters.includes("open")}
            className="h-100 border-2 border-gray-300 bg-transparent text-gray-300 aria-checked:bg-white"
            onClick={() => onClickFilter("open")}
          >
            Open tickets
          </Button>
          <Button
            aria-checked={filters.includes("closed")}
            className="h-100 border-2 border-gray-300 bg-transparent text-gray-300 aria-checked:bg-white"
            onClick={() => onClickFilter("closed")}
          >
            Closed tickets
          </Button>
        </div>
      </div>
      <div
        className={`grid w-full gap-4 ${gridView ? "grid-cols-3" : "grid-cols-1"}`}
      >
        {tickets &&
          tickets.length > 0 &&
          tickets
            .filter(ticket => filters.includes(ticket.status))
            .map((ticket, index) => (
              <div
                key={index}
                className="flex flex-col w-full gap-4 p-4 bg-white rounded-sm shadow-md"
              >
                <div className="flex justify-between">
                  <h2 className="text-lg text-gray-800 font-bold">
                    {ticket.subject}
                  </h2>
                  <span
                    className={`w-min px-2 py-1 text-xs font-bold ${
                      ticket.status === "open"
                        ? "bg-green-300 text-green-800"
                        : "bg-red-300 text-red-800"
                    } rounded-sm`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FromUserIcon className="text-2xl text-green-500" />
                  <div
                    key={index}
                    className="w-full flex flex-col gap-1 p-2 bg-gray-100 rounded-sm"
                  >
                    <span className="text-sm text-gray-800">
                      {ticket.subject}
                    </span>
                    <span className="text-xs text-gray-500">
                      {formatTimeToAgo(ticket.timestamp)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  {ticket.messages?.map((comment, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <FromAdminIcon className="text-2xl text-blue-500" />
                      <div className="flex flex-col gap-1 p-2 bg-gray-100 rounded-sm">
                        <span className="text-sm text-gray-800">
                          {comment.message}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimeToAgo(comment.timestamp)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <div
                    className={`flex items-center gap-2 ${
                      openReplyId === ticket.id ? "" : "hidden"
                    }`}
                  >
                    <FromAdminIcon className="text-2xl text-blue-500" />
                    <div className="w-full flex flex-col gap-1 p-2 bg-gray-100 rounded-sm">
                      <Input
                        className="w-full"
                        placeholder="Reply to this ticket"
                        value={replyValue}
                        onChange={e => setReplyValue(e.target.value)}
                      />
                      <Button
                        size="sm"
                        className="bg-blue-500 text-white"
                        onClick={() => {
                          handleAddReply(ticket.id, replyValue);
                        }}
                      >
                        Send
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    disabled={ticket.status === "closed"}
                    className="bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setOpenReplyId(ticket.id)}
                  >
                    <ReplyIcon className="text-xl text-blue-900" />
                  </Button>
                  <Button
                    disabled={ticket.status === "closed"}
                    className="bg-red-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CloseIcon className="text-xl text-red-900" />
                  </Button>
                </div>
              </div>
            ))}
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="text-3xl font-bold">Contact Forms</h1>
        {contactFormList && contactFormList.length > 0 && (
          <Table>
            <TableHeader>
              <TableColumn>Full Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Subject</TableColumn>
              <TableColumn>Message</TableColumn>
            </TableHeader>
            <TableBody>
              {contactFormList?.map((contactForm, index) => (
                <TableRow key={index}>
                  <TableCell>{contactForm.fullName}</TableCell>
                  <TableCell>{contactForm.email}</TableCell>
                  <TableCell>{contactForm.subject}</TableCell>
                  <TableCell>{contactForm.content}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
