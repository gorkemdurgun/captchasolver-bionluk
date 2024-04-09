"use client";

import { Button, ButtonGroup } from "@nextui-org/button";

import React, { useEffect, useState } from "react";

import {
  Card,
  Input,
  Pagination,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";

import {
  PiChatCircleDotsDuotone as FromUserIcon,
  PiAndroidLogoDuotone as FromAdminIcon,
  PiClock as PendingIcon,
  PiX as ClosedIcon
} from "react-icons/pi";
import {
  MdGridOn,
  MdOutlineReply as ReplyIcon,
  MdSwapHoriz as SwapIcon
} from "react-icons/md";
import {
  getContactForms,
  getAllTickets,
  editTicketStatus,
  addMessageToTicket
} from "@/services/tickets";
import { Dater } from "@/utils/Dater";

export default function AdminPage() {
  const [tickets, setTickets] = useState<Ticket[]>();
  const [ticketListPage, setTicketListPage] = useState<number>(1);
  const [selectedTicket, setSelectedTicket] = useState<Ticket>();
  const [ticketReplyModal, setTicketReplyModal] = useState<boolean>(false);
  const [ticketReply, setTicketReply] = useState<string>("");

  const [contacts, setContacts] = useState<ContactForm[]>([]);
  const [contactListPage, setContactListPage] = useState<number>(1);

  useEffect(() => {
    getAllTickets().then(response => {
      setTickets(response.data.tickets);
    });
    getContactForms().then(res => setContacts(res.data));
  }, []);

  const ticketItems = React.useMemo(() => {
    const start = (ticketListPage - 1) * 5;
    const end = start + 5;

    return tickets?.slice(start, end);
  }, [tickets, ticketListPage]);

  const contactFormItems = React.useMemo(() => {
    const start = (contactListPage - 1) * 5;
    const end = start + 5;

    return contacts?.slice(start, end);
  }, [contacts, contactListPage]);

  return (
    <>
      <Modal
        isOpen={ticketReplyModal}
        onClose={() => setTicketReplyModal(false)}
      >
        <ModalContent>
          <ModalHeader>Reply to Ticket</ModalHeader>
          <ModalBody>
            <Card className="flex items-center justify-center gap-2 p-4">
              {selectedTicket?.messages?.map((message, index) => (
                <span
                  key={index}
                  className={`w-full flex text-start gap-4 p-4 ${
                    message.senderEmail !== "development@capsmasher.com"
                      ? "bg-gray-800"
                      : "bg-gray-900"
                  }`}
                >
                  {message.senderEmail !== "development@capsmasher.com" ? (
                    <FromUserIcon size={24} />
                  ) : (
                    <FromAdminIcon size={24} />
                  )}
                  <div>
                    <p>{message.message}</p>
                    <small>{Dater.timeAgo(message.timestamp)}</small>
                  </div>
                </span>
              ))}
            </Card>
            <Input
              type="text"
              placeholder="Your reply"
              value={ticketReply}
              onChange={e => setTicketReply(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={() =>
                selectedTicket &&
                addMessageToTicket(
                  parseInt(selectedTicket?.id),
                  ticketReply
                ).then(() => {
                  getAllTickets().then(response => {
                    setTickets(response.data.tickets);
                  });
                  setTicketReplyModal(false);
                })
              }
            >
              Send
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl rounded-sm">
        <h1 className="text-3xl font-bold">Tickets & Contact Forms</h1>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold">Ticket List</h1>
          {tickets && ticketItems && ticketItems.length > 0 && (
            <Table
              isStriped
              bottomContent={
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="default"
                  page={ticketListPage}
                  total={
                    tickets?.length % 5 === 0
                      ? tickets?.length / 5
                      : Math.floor(tickets?.length / 5) + 1
                  }
                  onChange={page => setTicketListPage(page)}
                />
              }
            >
              <TableHeader>
                <TableColumn>Subject</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Created At</TableColumn>
                <TableColumn>First Message</TableColumn>
                <TableColumn>Last Reply</TableColumn>
                <TableColumn>Reply</TableColumn>
              </TableHeader>
              <TableBody>
                {ticketItems?.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      {
                        <div className="grid grid-cols-2">
                          {ticket.status === "closed" ? "Closed" : "Pending"}
                          <Switch
                            color="danger"
                            isSelected={ticket.status === "closed"}
                            onValueChange={value => {
                              editTicketStatus(
                                parseInt(ticket.id),
                                ticket.status === "closed"
                                  ? "pending"
                                  : "closed"
                              ).then(() => {
                                getAllTickets().then(response => {
                                  setTickets(response.data.tickets);
                                });
                              });
                            }}
                            thumbIcon={({ isSelected, className }) =>
                              isSelected ? (
                                <ClosedIcon className={className} />
                              ) : (
                                <PendingIcon className={className} />
                              )
                            }
                          />
                        </div>
                      }
                    </TableCell>
                    <TableCell>{Dater.timeAgo(ticket.timestamp)}</TableCell>
                    <TableCell>{ticket.messages[0].message}</TableCell>
                    <TableCell>
                      {ticket.messages[ticket.messages.length - 1].message}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-green-500"
                        onClick={() => {
                          setSelectedTicket(ticket);
                          setTicketReplyModal(true);
                        }}
                      >
                        <ReplyIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <div className="flex flex-col gap-4 w-full">
          <h1 className="text-3xl font-bold">Contact Form List</h1>
          {contacts && contactFormItems && contactFormItems.length > 0 && (
            <Table
              isStriped
              bottomContent={
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="default"
                  page={contactListPage}
                  total={
                    contacts?.length % 5 === 0
                      ? contacts?.length / 5
                      : Math.floor(contacts?.length / 5) + 1
                  }
                  onChange={page => setContactListPage(page)}
                />
              }
            >
              <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Email</TableColumn>
                <TableColumn>Subject</TableColumn>
                <TableColumn>Content</TableColumn>
              </TableHeader>
              <TableBody>
                {contactFormItems?.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>{contact.fullName}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell>{contact.content}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}
