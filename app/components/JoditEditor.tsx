"use client";

import dynamic from "next/dynamic";
const JoditEditorB = dynamic(() => import("jodit-react"), { ssr: false });
import { useMemo } from "react";

interface JoditEditorProps {
  value?: any;
  onChange: (value: any) => void | undefined;
  //   setCustomValue: (name: string, value: any) => void;
}
const JoditEditor: React.FC<JoditEditorProps> = ({ value, onChange }) => {
  const config = useMemo(
    () => ({
      removeButtons: [
        "source",
        "dots",
        "|",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "outdent",
        "indent",
        "|",
        "font",
        "brush",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "align",
        "undo",
        "redo",
        "|",
        // "hr",
        "eraser",
        "copyformat",
        "|",
        "symbol",
        "fullsize",
        "print",
        "about",
      ],
    }),
    []
  );

  return (
    <>
      <JoditEditorB config={config} value={value} onChange={(value) => onChange(value)} />
    </>
  );
};

export default JoditEditor;
