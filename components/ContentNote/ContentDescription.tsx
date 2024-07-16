"use client";

import React, { useEffect, useRef, useState } from "react";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import { SingleNoteType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";

const ContentDescription = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: (value: SingleNoteType) => void;
}) => {
  const {
    darkModeObject: { darkMode },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  const [isHovered, setIsHovered] = useState(false);

  const onUpdateDescription = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    //Create a new singleNote with the new title
    const newSingleNote = { ...singleNote, description: event.target.value };
    setSingleNote(newSingleNote);
  };

  const textAreaRef = useRef<HTMLTextAreaElement>(null!);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      // Reset the height to recalculate scrollHeight
      textArea.style.height = "auto";
      // Set the height to the scrollHeight plus some extra space (optional)
      textArea.style.height = `${textArea.scrollHeight + 20}px`;
    }
  }, [singleNote.description]);

  return (
    <div className="flex gap-2  text-[12px]  mt-8">
      <DescriptionOutlinedIcon
        sx={{ fontSize: 18 }}
        className={` mt-[9px] ${isHovered ? "text-purple-600" : "text-slate-400"}`}
      />

      <textarea
        ref={textAreaRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onBlur={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onChange={onUpdateDescription}
        value={singleNote.description}
        placeholder="New Description..."
        className={`text-sm outline-none  border ${isHovered ? "border-purple-600" : ""} rounded-lg p-2   w-full ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}`}
      />
    </div>
  );
};

export default ContentDescription;
