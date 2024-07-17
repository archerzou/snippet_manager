"use client";

import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGlobalContext } from "@/context/ContextApi";
import OpenTheContentNote from "@/components/OpenTheContentNote";

const EmptyPlaceHolder = ({
  muiIcon,
  text,
  isNew,
}: {
  muiIcon: React.ReactNode;
  text: React.ReactNode;
  isNew?: boolean;
}) => {
  const {
    isNewNoteObject: { isNewNote, setIsNewNote },
    selectedNoteObject: { selectedNote, setSelectedNote },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();
  return (
    <div className="  w-full h-[510px] pt-20 flex gap-3 flex-col items-center  ">
      {muiIcon}
      {text}
      {isNew && (
        <button
          onClick={() =>
            OpenTheContentNote(
              setIsNewNote,
              setSelectedNote,
              setOpenContentNote,
              sharedUserId,
            )
          }
          className="bg-purple-600 p-[8px] pr-2  text-sm text-white rounded-md mt-2 justify-center items-center"
        >
          <AddOutlinedIcon sx={{ fontSize: 17, color: "white" }} />
          <span className="ml-1 mr-2">Add a new snippet</span>
        </button>
      )}
    </div>
  );
};

export default EmptyPlaceHolder;
