import React from "react";
import { v4 as uuidv4 } from "uuid";
import { SingleNoteType } from "@/context/Types";

const OpenTheContentNote = (
  setIsNewNote: React.Dispatch<React.SetStateAction<boolean>>,
  setSelectedNote: React.Dispatch<React.SetStateAction<SingleNoteType | null>>,
  setOpenContentNote: React.Dispatch<React.SetStateAction<boolean>>,
  sharedUserId: string,
) => {
  const formatDate = (date: Date) => {
    //format the date to dd month yyyy
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  // Creating an new note
  const newSingleNote: SingleNoteType = {
    _id: uuidv4(),
    clerkUserId: sharedUserId || "",
    title: "",
    creationDate: formatDate(new Date()),
    tags: [],
    description: "",
    code: "",
    isFavorite: false,
    language: "Javascript",
    isTrash: false,
  };
  setIsNewNote(true);
  setSelectedNote(newSingleNote);
  setOpenContentNote(true);
};

export default OpenTheContentNote;
