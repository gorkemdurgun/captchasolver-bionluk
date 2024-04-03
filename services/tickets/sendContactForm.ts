import { Axios } from "@/Axios";

export const sendContactForm = (form: ContactForm) => {
  return Axios.post("/sendContactForm", form);
};
