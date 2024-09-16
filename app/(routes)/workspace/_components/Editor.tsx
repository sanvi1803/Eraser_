"use client";
import React, { useEffect, useRef, useState } from "react";

import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import Paragraph from "@editorjs/paragraph";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FILE } from "../../dashboard/_components/FileList";
const rawDocument = {
  time: 1550476186479,
  blocks: [
    {
      data: {
        text: "Document Name",
        level: 2,
      },
      id: "123",
      type: "header",
    },
    {
      data: {
        level: 4,
      },
      id: "1234",
      type: "header",
    },
  ],
  version: "2.8.1",
};
function Editor({
  onSaveTrigger,
  fileId,
  fileData,
}: {
  onSaveTrigger: any;
  fileId: any;
  fileData: FILE;
}) {
  const ref = useRef<EditorJS | null>(null);
  const updateDocument = useMutation(api.files.updateDocument);
  const [document, setDocument] = useState(rawDocument);
  useEffect(() => {
    // Only initialize EditorJS when running in the browser
    if (typeof window !== "undefined" && fileData) {
      initEditor();
    }
    // Cleanup on unmount
    return () => {
      ref.current?.destroy?.();
      ref.current = null;
    };
  }, [fileData]);

  useEffect(() => {
    console.log("Trigger Value", onSaveTrigger);
    onSaveTrigger && onSaveDocument();
  }, [onSaveTrigger]);

  // const initEditor = () => {
  //   const editor = new EditorJS({
  //     /**
  //      * Id of Element that should contain Editor instance
  //      */
  //     tools: {
  //       header: {
  //         // @ts-ignore
  //         class: Header,
  //         shortcut: "CTRL+SHIFT+H",
  //         config: {
  //           placeholder: "Enter a header",
  //         },
  //       },
  //       list: {
  //         // @ts-ignore
  //         class: List,
  //         inlineToolbar: true,
  //         config: {
  //           defaultStyle: "unordered",
  //         },
  //       },
  //       checklist: {
  //         class: Checklist,
  //         inlineToolbar: true,
  //       },
  //       paragraph: Paragraph,
  //     },
  //     holder: "editorjs",
  //     data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
  //   });
  //   ref.current = editor;
  // };
  const initEditor = () => {
    if (!ref.current) {
      const editor = new EditorJS({
        tools: {
          header: {
            // @ts-ignore
            class: Header,
            shortcut: "CTRL+SHIFT+H",
            config: {
              placeholder: "Enter a header",
            },
          },
          list: {
            // @ts-ignore
            class: List,
            inlineToolbar: true,
            config: {
              defaultStyle: "unordered",
            },
          },
          checklist: {
            class: Checklist,
            inlineToolbar: true,
          },
          paragraph: Paragraph,
        },
        holder: "editorjs",
        data: fileData?.document ? JSON.parse(fileData.document) : rawDocument,
      });
      ref.current = editor;
    }
  };
  const onSaveDocument = () => {
    if (ref.current) {
      ref.current
        .save()
        .then((outputData) => {
          console.log("Article data: ", outputData);
          updateDocument({
            _id: fileId,
            document: JSON.stringify(outputData),
          }).then(
            (res) => {
              toast("Document Updated!");
            },
            (err) => {
              toast("Error in saving the document");
            }
          );
        })
        .catch((error) => {
          console.log("Saving failed: ", error);
        });
    }
  };
  return (
    <div>
      <div id="editorjs" className="ml-5"></div>
    </div>
  );
}

export default Editor;
