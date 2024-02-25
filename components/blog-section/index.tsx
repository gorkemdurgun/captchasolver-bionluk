import Text from "../text";
import BlogSectionLayout from "./layout";

import {
  PiDotDuotone as PiMatterIcon,
  PiCaretDoubleDown as PiArrowDownIcon
} from "react-icons/pi";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
  Divider
} from "@nextui-org/react";

const dummyBlogPosts = [
  {
    image:
      "https://plus.unsplash.com/premium_photo-1675282443407-b9c9ada52b82?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "How can I get free trial of Capsmasher?",
    description:
      "Capsmasher is a captcha solving service that allows you to solve captchas for free. You can get a free trial of Capsmasher by signing up for an account and using the free trial credits that are provided to you. The free trial credits allow you to solve a limited number of captchas for free, so you can test out the service and see if it meets your needs before you decide to purchase more credits.",
    date: "2021-09-01"
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1670402130476-25aa8c1986c9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "When should I use a captcha solving service?",
    description:
      "If you need to solve captchas on a regular basis, then you should consider using a captcha solving service. Captcha solving services are designed to help you solve captchas quickly and easily, so you can focus on other tasks. They are especially useful for businesses that need to solve captchas in bulk, as they can save you time and money by automating the process of solving captchas.",
    date: "2021-10-05"
  },
  {
    image:
      "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=3387&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "What are the benefits of using a captcha solving service?",
    description:
      "There are many benefits to using a captcha solving service. Captcha solving services are designed to help you solve captchas quickly and easily, so you can focus on other tasks. They are especially useful for businesses that need to solve captchas in bulk, as they can save you time and money by automating the process of solving captchas.",
    date: "2021-11-15"
  },
  {
    image:
      "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=3330&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Is Enterprise Plan available for Capsmasher?",
    description:
      "Yes, Capsmasher offers an Enterprise Plan for businesses that need to solve captchas in bulk. The Enterprise Plan is designed to help businesses solve captchas quickly and easily, so they can focus on other tasks. It is especially useful for businesses that need to solve captchas in bulk, as it can save them time and money by automating the process of solving captchas.",
    date: "2022-01-01"
  },
  {
    image:
      "https://images.unsplash.com/photo-1614064642261-3ccbfafa481b?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Why I choose Capsmasher for my business?",
    description:
      "Capsmasher is a captcha solving service that allows you to solve captchas quickly and easily. It is especially useful for businesses that need to solve captchas in bulk, as it can save them time and money by automating the process of solving captchas.",
    date: "2022-02-22"
  }
];

export const BlogSection = () => {
  return (
    <BlogSectionLayout>
      <div className="flex flex-col items-center justify-center w-full gap-4 py-8 px-6 md:py-10">
        <span className="px-12 py-2 rounded-sm bg-gradient-to-r from-red-100/5 via-gray-100 to-red-100/5 lg:px-64">
          <Text className="text-major text-black text-3xl md:text-5xl">
            BLOG POSTS
          </Text>
        </span>
        <Text className="text-body text-black text-md text-center lg:text-xl">
          Read our latest blog posts to stay updated with our services and
          products. We share our knowledge and experience to help you grow your
          business. We also share tips and tricks to help you solve captchas.
        </Text>
        <Divider className="w-full my-4" />
        <div className="grid grid-cols-12 grid-rows-2 gap-4 mt-4 w-full">
          {dummyBlogPosts.slice(0, 3).map((post, index) => (
            <Card
              key={index}
              className="col-span-12 sm:col-span-4 h-[300px] border-4 cursor-pointer hover:scale-95"
            >
              <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {post.date}
                </p>
                <h4 className="text-white font-medium text-large">
                  {post.title}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover brightness-50"
                src={post.image}
              />
            </Card>
          ))}
          {dummyBlogPosts.slice(3, 5).map((post, index) => (
            <Card
              key={index}
              className="col-span-12 sm:col-span-6 h-[300px] border-4 cursor-pointer hover:scale-95"
            >
              <CardHeader className="absolute z-10 top-1 flex-col items-start">
                <p className="text-tiny text-white/60 uppercase font-bold">
                  {post.date}
                </p>
                <h4 className="text-black font-medium text-2xl text-white">
                  {post.title}
                </h4>
              </CardHeader>
              <Image
                removeWrapper
                alt="Card example background"
                className="z-0 w-full h-full scale-125 -translate-y-6 object-cover brightness-50"
                src={post.image}
              />
            </Card>
          ))}
        </div>
        <Button className="primary-button bg-black mt-4 w-full hover:bg-black lg:min-w-[400px]">
          <Text className="text-body text-white text-lg">Read More</Text>
          <PiArrowDownIcon className="text-white text-xl" />
        </Button>
      </div>
    </BlogSectionLayout>
  );
};
