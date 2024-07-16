"use client";

import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useGlobalContext } from "@/context/ContextApi";
import { truncateString } from "@/lib/utils";

interface CodeBlockProps {
  language: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();

  return (
    <div className="rounded-md overflow-hidden text-sm ">
      <SyntaxHighlighter
        language={"javascript"}
        style={darkMode[1].isSelected ? oneDark : materialLight}
      >
        {truncateString(code, 300)}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
