"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import FontSize from "@tiptap/extension-font-size";
import Color from "@tiptap/extension-color";
import Heading from "@tiptap/extension-heading";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";
import CodeBlock from "@tiptap/extension-code-block";
import Link from "@tiptap/extension-link";
import Blockquote from "@tiptap/extension-blockquote";
import TextAlign from "@tiptap/extension-text-align";

type Props = {
  name: string;
  value: string;
  onChange: (html: string) => void;
};

export default function TiptapEditor({ name, value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Underline,
      TextStyle,
      FontSize,
      Color,
      BulletList,
      OrderedList,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      CodeBlock,
      Link,
      Blockquote,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <>
      <EditorContent
        editor={editor}
        className="prose max-w-none min-h-[200px] border rounded p-3"
      />

      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={value} />
    </>
  );
}
