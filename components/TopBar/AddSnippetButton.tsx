"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import OpenTheContentNote from "@/components/TopBar/OpenTheContentNote";

const AddSnippetButton = () => {
  const {
    openContentNoteObject: { setOpenContentNote, openContentNote },
    selectedNoteObject: { setSelectedNote },
    allNotesObject: { allNotes, setAllNotes },
    isNewNoteObject: { isNewNote, setIsNewNote },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();
  return (
    <button
      disabled={openContentNote}
      onClick={() =>
        OpenTheContentNote(
          setIsNewNote,
          setSelectedNote,
          setOpenContentNote,
          sharedUserId,
        )
      }
      className={`absolute flex gap-1 px-2 rounded-3xl max-md:px-1    p-1 
      text-[13px] text-white top-[6px] right-[6px] items-center cursor-pointer select-none ${openContentNote ? "bg-purple-300" : "bg-purple-600"}`}
    >
      <AddOutlinedIcon sx={{ fontSize: 18 }} />
      <div className="max-md:hidden ">Snippet</div>
    </button>
  );
};

export default AddSnippetButton;
