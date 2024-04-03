type Ticket = {
  id: string;
  senderId: string;
  senderEmail: string;
  timestamp: string;
  subject: string;
  status: string;
  messages: {
    senderId: string;
    senderEmail: string;
    timestamp: string;
    message: string;
  }[];
};

type ContactForm = {
  fullName: string;
  email: string;
  subject: string;
  content: string;
};
