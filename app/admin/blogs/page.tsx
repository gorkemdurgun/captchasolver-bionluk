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
  Card,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
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
import { addBlog, deleteBlog, editBlog, getBlogs } from "@/services/blogs";
import { errorToast, successToast } from "@/components/toaster";
import { useAppSelector } from "@/hooks";

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

  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

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
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [newBlogModal, setNewBlogModal] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<{
    title: string;
    content: string;
    tags: string[];
    image?: File;
  }>({
    image: undefined,
    title: "New Blog Post",
    content: "",
    tags: []
  });

  function handleAddPost() {
    addBlog({
      title: newPost?.title,
      // content: editor?.getHTML() || "",
      tags: newPost.tags,
      image: newPost.image
    })
      .then(() => {
        setNewBlogModal(false);
        successToast("Blog post added successfully");
      })
      .catch(err => {
        errorToast(err.message);
      });
  }
  function handleSelectPost(index: number) {
    setSelectedPost(index);
  }
  function handleChangeName(name: string) {
    const newPosts = [...blogPosts];
    newPosts[selectedPost].title = name;
    setBlogPosts(newPosts);
  }
  function handleSavePost() {
    const editedPost = {
      ...blogPosts[selectedPost],
      content: editor?.getHTML() || ""
    };

    console.log(editedPost);

    editBlog(editedPost)
      .then(() => {
        successToast("Blog post saved successfully");
      })
      .catch(err => {
        errorToast(err.message);
      });
  }

  useEffect(() => {
    getBlogs().then(response => {
      setBlogPosts(response);
    });
  }, []);

  useEffect(() => {
    if (editor) {
      editor?.commands.setContent(blogPosts[selectedPost].content);
    }
  }, [selectedPost]);

  const { user } = useAppSelector(state => state.auth);

  if (!user || user?.email !== "development@capsmasher.com") {
    return (
      <section className="flex flex-col items-center w-full h-full gap-4 lg:py-10 bg-gray-900">
        <div className="container max-w-7xl px-4">
          <h1 className="text-3xl font-bold text-white mb-4">Admin</h1>
          <Card className="flex gap-2 p-4 bg-white">
            <h2 className="text-xl text-black font-bold">
              You are not authorized to access this page
            </h2>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <>
      <Modal isOpen={newBlogModal} onClose={() => setNewBlogModal(false)}>
        <ModalContent>
          <ModalHeader>Add Blog Post</ModalHeader>
          <ModalBody>
            <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl bg-gray-900 rounded-sm">
              <Input
                className="w-full max-w-xl"
                placeholder="Title"
                value={newPost?.title}
                onChange={e =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <Input
                className="w-full max-w-xl"
                placeholder="Tags"
                value={newPost.tags.join(", ")}
                onChange={e =>
                  setNewPost({
                    ...newPost,
                    tags: e.target.value.split(",")?.map(tag => tag.trim())
                  })
                }
              />
              <input
                type="file"
                accept="image/*"
                className="w-full max-w-xl"
                onChange={e =>
                  setNewPost({
                    ...newPost,
                    image: e.target.files ? e.target.files[0] : undefined
                  })
                }
              />
              {newPost.image && (
                <Image
                  src={URL.createObjectURL(newPost.image)}
                  alt={newPost?.title}
                  width={150}
                  height={150}
                />
              )}
              <Button
                className="w-full max-w-xs bg-green-500 text-white text-body text-sm font-bold"
                onClick={handleAddPost}
              >
                Save
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl bg-gray-900 rounded-sm">
        <div className="w-full flex flex-row gap-20">
          <div className="w-full flex flex-col justify-start gap-4 p-4">
            <div className="w-full flex flex-row justify-between">
              <Input
                className="w-full max-w-xl"
                placeholder="Search blog post"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <Button
                className="h-full bg-gray-500 text-white text-sm"
                onClick={() => setNewBlogModal(true)}
              >
                <AddIcon className="w-8 h-8" />
              </Button>
            </div>
            <div className="w-full grid grid-cols-2 justify-start gap-2 p-2 max-h-[300px] overflow-auto bg-gray-800 rounded-md">
              {blogPosts
                .filter(post =>
                  post?.title.toLowerCase().includes(searchQuery.toLowerCase())
                )
                ?.map((post, index) => (
                  <div
                    className="flex flex-row items-center justify-start p-2 gap-2 min-h-[80px] rounded-md bg-gray-600"
                    key={index}
                    onClick={() => handleSelectPost(index)}
                  >
                    <Image
                      src={post.imageUrl}
                      alt={post?.title}
                      width={50}
                      height={50}
                    />
                    <span className="text-white">{post?.title}</span>

                    {/* <Button
                      size="sm"
                      className="ml-auto bg-gray-500 text-white text-sm"
                      onClick={() => handleSelectPost(index)}
                    >
                      <EditIcon className="w-4 h-4" />
                    </Button> */}
                    {/* <Button
                      size="sm"
                      className="bg-gray-500 text-white text-sm"
                      onClick={() => {
                        deleteBlog(post.id).then(() => {
                          const newPosts = [...blogPosts];
                          newPosts.splice(index, 1);
                          setBlogPosts(newPosts);
                          successToast("Blog post deleted successfully");
                        });
                      }}
                    >
                      <DeleteIcon className="w-4 h-4" />
                    </Button> */}
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col justify-start gap-2 mt-8">
          <h5 className="text-white">Title</h5>
          <Input
            className="w-full max-w-xl"
            placeholder="Title"
            value={blogPosts[selectedPost]?.title}
            onChange={e => handleChangeName(e.target.value)}
          />
          <div className="w-full flex flex-row flex-wrap items-center gap-2 bg-gray-800 p-4 rounded-t-lg">
            <h5 className="text-white">Tags</h5>
            {blogPosts[selectedPost]?.tags?.map((tag, index) => (
              <Input
                key={index}
                className="w-fit bg-gray-600 text-white"
                value={tag}
                onChange={e => {
                  const newPosts = [...blogPosts];
                  newPosts[selectedPost].tags[index] = e.target.value;
                  setBlogPosts(newPosts);
                }}
              />
            ))}
            {blogPosts[selectedPost] && (
              <Button
                className="bg-gray-500 text-white text-sm"
                onClick={() => {
                  const newPosts = [...blogPosts];
                  newPosts[selectedPost].tags.push("");
                  setBlogPosts(newPosts);
                }}
              >
                <AddIcon className="w-4 h-4" />
              </Button>
            )}
          </div>

          <div className="flex flex-wrap items-center  gap-2 bg-gray-800 p-4 rounded-t-lg">
            {/* Dropdown for text styles */}
            {editorTextStyles?.map((button, index) => (
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
            {editorListStyles?.map((button, index) => (
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
            {editorFontStyles?.map((button, index) => (
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
                {editorColors?.map((color, index) => (
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
            className="w-full h-full p-4 outline-none bg-white text-black rounded-b-lg shadow-md text-body max-h-[1000px] overflow-auto"
            editor={editor}
          />
        </div>
        <Button
          className="w-full max-w-xs bg-green-500 text-white text-body text-sm font-bold"
          onClick={() => {
            handleSavePost();
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
}
