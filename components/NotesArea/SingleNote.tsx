"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import { SingleNoteType } from "@/types";
import NoteHeader from "@/components/NotesArea/NoteHeader";
import NoteDate from "@/components/NotesArea/NoteDate";
import NoteTags from "@/components/NotesArea/NoteTags";
import NoteDescription from "@/components/NotesArea/NoteDescription";
import CodeBlock from "@/components/NotesArea/CodeBlock";
import NoteFooter from "@/components/NotesArea/NoteFooter";

const SingleNote = ({ note }: { note: SingleNoteType }) => {
  const {
    darkModeObject: { darkMode },
    openContentNoteObject: { openContentNote },
    selectedNoteObject: { selectedNote },
    allNotesObject: { allNotes },
  } = useGlobalContext();

  const {
    _id,
    title,
    creationDate,
    tags,
    description,
    code,
    isFavorite,
    isTrash,
    language,
  } = note;

  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} ${openContentNote ? "w-full" : "w-[390px]"} 
      max-sm:w-full rounded-md py-4   hover:translate-y-[-1px] ${selectedNote?._id === _id && !selectedNote.isTrash ? "border border-purple-600" : ""} `}
    >
      <NoteHeader
        id={_id}
        title={title}
        isFavorite={isFavorite}
        isTrashed={isTrash}
      />
      <NoteDate creationDate={creationDate} />
      <NoteTags tags={tags} />
      <NoteDescription description={description} />
      <CodeBlock language={language} code={code} />
      <NoteFooter language={language} note={note} />
    </div>
  );
};

export default SingleNote;
