"use client";

import { Button } from "@nextui-org/button";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

import { Color } from "@tiptap/extension-color";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

import {
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input
} from "@nextui-org/react";

import {
  LuBold as BoldIcon,
  LuItalic as ItalicIcon,
  LuStrikethrough as StrikeIcon,
  LuCode as CodeIcon,
  LuListOrdered as OrderedListIcon,
  LuList as BulletListIcon,
  LuHeading1 as H1Icon,
  LuHeading2 as H2Icon,
  LuHeading3 as H3Icon,
  LuType as ParagraphIcon,
  LuUndo2 as UndoIcon,
  LuRedo2 as RedoIcon
} from "react-icons/lu";

import { PiPaletteDuotone as ColorIcon } from "react-icons/pi";

import {
  MdEdit as EditIcon,
  MdAddCard as AddIcon,
  MdDelete as DeleteIcon,
  MdCheck as RenameIcon
} from "react-icons/md";

import Image from "next/image";

export default function AdminPage() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextStyle,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({
        levels: [1, 2, 3]
      })
    ],
    content: "<p>Please select a page and sub page for editing</p>"
  });

  const initialPosts: {
    image: string;
    title: string;
    content: string;
    tags: string[];
  }[] = [
    {
      image: "https://via.placeholder.com/150",
      title: "First Blog Post",
      content: "<p>First blog post content</p>",
      tags: ["first", "blog", "post"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Second Blog Post",
      content: "<p>Second blog post content</p>",
      tags: ["second", "blog", "post"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Third Blog Post",
      content: "<p>Third blog post content</p>",
      tags: ["third", "blog", "post"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Fourth Blog Post",
      content: "<p>Fourth blog post content</p>",
      tags: ["fourth", "blog", "post"]
    },
    {
      image: "https://via.placeholder.com/150",
      title: "Fifth Blog Post",
      content: "<p>Fifth blog post content</p>",
      tags: ["fifth", "blog", "post"]
    }
  ];

  const [blogPosts, setBlogPosts] = useState<
    {
      image: string;
      title: string;
      content: string;
      tags: string[];
    }[]
  >(initialPosts);

  const editorFontStyles = [
    {
      action: "bold",
      icon: <BoldIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleBold().run()
    },
    {
      action: "italic",
      icon: <ItalicIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleItalic().run()
    },
    {
      action: "strike",
      icon: <StrikeIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleStrike().run()
    },
    {
      action: "code",
      icon: <CodeIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleCode().run()
    }
  ];
  const editorTextStyles = [
    {
      action: "heading1",
      icon: <H1Icon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleHeading({ level: 1 }).run()
    },
    {
      action: "heading2",
      icon: <H2Icon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleHeading({ level: 2 }).run()
    },
    {
      action: "heading3",
      icon: <H3Icon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleHeading({ level: 3 }).run()
    },
    {
      action: "paragraph",
      icon: <ParagraphIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().setParagraph().run()
    }
  ];
  const editorListStyles = [
    {
      action: "bullet",
      icon: <BulletListIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      action: "ordered",
      icon: <OrderedListIcon className="w-6 h-6" />,
      function: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ];
  const editorColors = ["red", "green", "blue", "purple", "black"];

  const [selectedPost, setSelectedPost] = useState<number>(0);

  function handleAddPost() {
    const newPosts = [...blogPosts];
    newPosts.push({
      image: "https://via.placeholder.com/150",
      title: "New Blog Post",
      content: "<p>New blog post content</p>",
      tags: ["new", "blog", "post"]
    });
    setBlogPosts(newPosts);
  }
  function handleSelectPost(index: number) {
    setSelectedPost(index);
  }
  function handleChangeName(name: string) {
    const newPosts = [...blogPosts];
    newPosts[selectedPost].title = name;
    setBlogPosts(newPosts);
  }

  useEffect(() => {
    if (editor) {
      editor?.commands.setContent(blogPosts[selectedPost].content);
    }
  }, [selectedPost]);

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl bg-gray-900 rounded-sm">
      <div className="w-full flex flex-row gap-20">
        <div className="w-full flex flex-col justify-start gap-2 p-4">
          <div className="w-full flex flex-row justify-between">
            <Input className="w-full max-w-xl" placeholder="Search blog post" />
            <Button
              className="h-full bg-blue-500 text-white text-sm"
              onClick={handleAddPost}
            >
              <AddIcon className="w-8 h-8" />
            </Button>
          </div>
          <div className="w-full flex flex-col justify-start gap-2 py-4 max-h-[300px] overflow-scroll">
            {blogPosts.map((post, index) => (
              <div
                className="flex flex-row items-center justify-start p-1 pr-3 gap-2 min-h-[60px] bg-gray-600"
                key={index}
                onClick={() => handleSelectPost(index)}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={50}
                  height={50}
                />
                <Input
                  className="w-full max-w-lg"
                  value={post.title}
                  onChange={e => handleChangeName(e.target.value)}
                />

                <Button
                  size="sm"
                  className="ml-auto bg-yellow-500 text-white text-sm"
                  onClick={() => handleSelectPost(index)}
                >
                  <EditIcon className="w-4 h-4" />
                </Button>
                <Button size="sm" className="bg-red-500 text-white text-sm">
                  <DeleteIcon className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col justify-start mt-8">
        <div className="flex flex-wrap items-center  gap-2 bg-gray-800 p-4 rounded-t-lg">
          {/* Dropdown for text styles */}
          {editorTextStyles.map((button, index) => (
            <Button
              key={index}
              onClick={button.function}
              className="bg-transparent text-white border-2 rounded-md"
            >
              {button.icon}
            </Button>
          ))}
          <Divider className="bg-gray-500 mx-2 h-10 w-[2px]" />
          {/* Dropdown for list styles */}
          {editorListStyles.map((button, index) => (
            <Button
              key={index}
              onClick={button.function}
              className="bg-transparent text-white border-2 rounded-md"
            >
              {button.icon}
            </Button>
          ))}
          <Divider className="bg-gray-500 mx-2 h-10 w-[2px]" />
          {/* Dropdown for font styles */}
          {editorFontStyles.map((button, index) => (
            <Button
              key={index}
              onClick={button.function}
              className="bg-transparent text-white border-2 rounded-md"
            >
              {button.icon}
            </Button>
          ))}
          <Divider className="bg-gray-500 mx-2 h-10 w-[2px]" />
          {/* Dropdown for color selection */}
          <Dropdown
            classNames={{
              base: "bg-white",
              content: "bg-white"
            }}
          >
            <DropdownTrigger>
              <Button className="bg-transparent text-white border-2 min-w-1 rounded-md">
                <ColorIcon className="w-4 h-4 color-white" />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              {editorColors.map((color, index) => (
                <DropdownItem
                  key={index}
                  className="bg-white text-black"
                  onClick={() => {
                    if (color !== "black") {
                      editor?.chain().focus().setColor(color).run();
                    } else {
                      editor?.chain().focus().unsetColor().run();
                    }
                  }}
                >
                  <div className="flex flex-row items-center">
                    <div
                      style={{ backgroundColor: color }}
                      className="w-4 h-4 rounded-full mr-2"
                    />
                    {color}
                  </div>
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          {/* Undo and Redo */}
          <div className="flex gap-2">
            <Button
              onClick={() => editor?.chain().focus().undo().run()}
              className="bg-transparent text-white border-2 min-w-1 rounded-md"
            >
              <UndoIcon className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => editor?.chain().focus().redo().run()}
              className="bg-transparent text-white border-2 min-w-1 rounded-md"
            >
              <RedoIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <EditorContent
          className="w-full h-full p-4 outline-none bg-white text-black rounded-b-lg shadow-md text-body max-h-[1000px] overflow-scroll"
          editor={editor}
        />
      </div>
      <Button
        className="w-full max-w-xs bg-green-500 text-white text-body text-sm font-bold"
        onClick={() => {
          console.log(editor?.getHTML());
        }}
      >
        Save
      </Button>
    </div>
  );
}
