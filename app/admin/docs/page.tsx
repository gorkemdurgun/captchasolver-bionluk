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

import {
  PiPaletteDuotone as ColorIcon,
  PiCheck as CheckIcon
} from "react-icons/pi";
import {
  createDocumentation,
  editDocumentation,
  getDocumentations
} from "@/services/docs";
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

  const [docTrees, setDocTrees] = useState<Documentation[]>([]);

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

  const [selectedPage, setSelectedPage] = useState(-1);
  const [selectedSubItem, setSelectedSubItem] = useState(0);

  function addNewPage() {
    createDocumentation().then(({ data }) => {
      getDocumentations();
    });
  }
  function addNewSubItem(index: number) {
    const newSubItem = {
      title: `Sub Page ${docTrees[index].subItems.length + 1}`,
      content: "<p>Start typing here</p>"
    };
    const newSubItems = docTrees[index].subItems;
    newSubItems.push(newSubItem);
    setDocTrees([
      ...docTrees?.slice(0, index),
      { ...docTrees[index], subItems: newSubItems },
      ...docTrees?.slice(index + 1)
    ]);
  }

  function handleSelectPage(index: number) {
    setSelectedPage(index);
    setSelectedSubItem(0);
  }
  function handleSelectSubItem(index: number) {
    setSelectedSubItem(index);
  }

  function handleSave(selectedDoc: Documentation, selectedSubItem: number) {
    const newDoc = {
      id: selectedDoc.id,
      title: selectedDoc?.title,
      subItems: selectedDoc.subItems?.map((subItem, index) => {
        if (index === selectedSubItem) {
          return {
            title: subItem?.title,
            content: editor?.getHTML() || ""
          };
        }
        return subItem;
      })
    };
    editDocumentation(newDoc).then(({ data }) => {
      getDocumentations().then(({ data: response }) => {
        setDocTrees(response.documentations);
      });
    });
  }

  useEffect(() => {
    if (editor && selectedPage !== null) {
      editor?.commands.setContent(
        docTrees[selectedPage]?.subItems[selectedSubItem]?.content
      );
    }
  }, [selectedPage, selectedSubItem]);

  useEffect(() => {
    getDocumentations().then(({ data: response }) => {
      setDocTrees(response.documentations);
    });
  }, []);

  const { user } = useAppSelector(state => state.auth);

  if (!user || user?.type !== "admin") {
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
    <div className="flex flex-col items-center justify-center w-full gap-4 p-8 max-w-7xl bg-gray-900 rounded-sm">
      <div className="w-full flex flex-col justify-start gap-2">
        <span className="text-white">Select a page:</span>
        <div className="flex gap-4">
          <Button
            className="text-black bg-white border-2 text-xs font-bold"
            onClick={addNewPage}
          >
            + ADD PAGE
          </Button>
          {docTrees?.map((page, index) => (
            <Button
              key={index}
              aria-checked={selectedPage === index}
              className="text-white bg-transparent border-2 aria-checked:border-green-500"
              onClick={() => handleSelectPage(index)}
            >
              {page?.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-4">
          <Input
            disabled={selectedPage === -1}
            className="w-full max-w-lg mt-2"
            placeholder="Rename selected page"
            value={docTrees[selectedPage]?.title}
            onChange={e => {
              const newTitle = e.target.value;
              setDocTrees([
                ...docTrees?.slice(0, selectedPage),
                { ...docTrees[selectedPage], title: newTitle },
                ...docTrees?.slice(selectedPage + 1)
              ]);
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-start gap-2">
        <span className="text-white">Select a sub page:</span>
        <div className="flex gap-4">
          <Button
            disabled={selectedPage === -1}
            className="text-black bg-white border-2 text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => addNewSubItem(selectedPage)}
          >
            + ADD SUB PAGE
          </Button>
          {docTrees[selectedPage]?.subItems?.map((subItem, index) => (
            <Button
              disabled={selectedPage === -1}
              key={index}
              aria-checked={selectedSubItem === index}
              className="text-white bg-transparent border-2 aria-checked:border-green-500"
              onClick={() => handleSelectSubItem(index)}
            >
              {subItem?.title}
            </Button>
          ))}
        </div>
        <div className="flex flex-row items-center gap-4">
          <Input
            disabled={selectedPage === -1}
            className="w-full max-w-lg mt-2"
            placeholder="Rename selected sub page"
            value={docTrees[selectedPage]?.subItems[selectedSubItem]?.title}
            onChange={e => {
              const newSubItems = docTrees[selectedPage].subItems;
              newSubItems[selectedSubItem].title = e.target.value;
              setDocTrees([
                ...docTrees?.slice(0, selectedPage),
                { ...docTrees[selectedPage], subItems: newSubItems },
                ...docTrees?.slice(selectedPage + 1)
              ]);
            }}
          />
        </div>
      </div>
      <div className="w-full flex flex-col justify-start mt-8">
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
          className="w-full h-full p-4 outline-none bg-white text-black rounded-b-lg shadow-md text-body"
          editor={editor}
        />
      </div>
      <Button
        className="w-full max-w-xs bg-green-500 text-white text-body text-sm font-bold"
        onClick={() => {
          handleSave(docTrees[selectedPage], selectedSubItem);
        }}
      >
        Save
      </Button>
    </div>
  );
}
