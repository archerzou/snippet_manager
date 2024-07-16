"use client";

import React, { useEffect, useRef, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import TitleOutlinedIcon from "@mui/icons-material/TitleOutlined";
import { SingleNoteType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";

const ContentNoteHeader = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
    openContentNoteObject: { setOpenContentNote, openContentNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    darkModeObject: { darkMode },
    selectedNoteObject: { setSelectedNote },
  } = useGlobalContext();
  const [onFocus, setOnFocus] = useState(false);
  const textRef = useRef<HTMLTextAreaElement>(null!);

  const onUpdateTitle = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSingleNote = { ...singleNote, title: event.target.value };
    setSingleNote(newSingleNote);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  //Set the focus to the text area
  useEffect(() => {
    if (openContentNote) {
      textRef.current?.focus();

      setOnFocus(true);
    }
  }, [openContentNote]);

  //When the focus is on the text area, set the focus to the title
  useEffect(() => {
    if (singleNote.title !== "") {
      setOnFocus(true);
    }
  }, [singleNote.title]);

  return (
    <div className="flex justify-between    gap-8 mb-4 ">
      <div className="flex   gap-2 w-full  ">
        <TitleOutlinedIcon
          sx={{ fontSize: 19 }}
          className={`${onFocus ? "text-purple-600" : "text-slate-400"} mt-[4px]`}
        />
        <textarea
          ref={textRef}
          placeholder="New Title..."
          value={singleNote.title}
          onChange={onUpdateTitle}
          onKeyDown={handleKeyDown}
          onBlur={() => setOnFocus(false)}
          onFocus={() => setOnFocus(true)}
          onMouseEnter={() => setOnFocus(true)}
          onMouseLeave={() => setOnFocus(false)}
          className={`font-bold text-xl outline-none resize-none  h-auto  overflow-hidden w-full ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} `}
        />
      </div>
      <CloseIcon
        onClick={() => {
          setIsNewNote(false);
          setOpenContentNote(false);
          setSingleNote(undefined);
          setSelectedNote(null);
        }}
        className="text-slate-400 mt-[7px] cursor-pointer"
        sx={{ cursor: "pointer", fontSize: 18 }}
      />
    </div>
  );
};

export default ContentNoteHeader;
