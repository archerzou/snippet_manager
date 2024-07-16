"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import { truncateString } from "@/lib/utils";

const NoteDescription = ({ description }: { description: string }) => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`${darkMode[1].isSelected ? "text-white" : ""} text-slate-600 text-[13px] mt-4 mx-4`}
    >
      <span className="pre-wrap">{truncateString(description, 200)}</span>
    </div>
  );
};

export default NoteDescription;
