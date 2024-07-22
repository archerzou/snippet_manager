"use client";

import React, { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import { useGlobalContext } from "@/context/ContextApi";
import { SingleNoteType } from "@/types";
import ContentNoteHeader from "@/components/ContentNote/ContentNoteHeader";
import ContentNoteTags from "@/components/ContentNote/ContentNoteTags";
import ContentDescription from "@/components/ContentNote/ContentDescription";
import ContentCodeBlock from "@/components/ContentNote/ContentCodeBlock";

const ContentNote = () => {
  const {
    openContentNoteObject: { openContentNote, setOpenContentNote },
    isMobileObject: { isMobile, setIsMobile },
    selectedNoteObject: { selectedNote, setSelectedNote },
    isNewNoteObject: { isNewNote, setIsNewNote },
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage },
  } = useGlobalContext();

  const [singleNote, setSingleNote] = useState<SingleNoteType | undefined>(
    undefined
  );
  useEffect(() => {
    //If openContentNote is true
    if (openContentNote) {
      if (selectedNote) {
        setSingleNote(selectedNote);
      }
    }
  }, [openContentNote, selectedNote]);

  const saveNoteInDB = async (note: SingleNoteType, isNew: boolean) => {
    const url = isNew ? "/api/snippets" : `/api/snippets?snippetId=${note._id}`;
    const method = isNew ? "POST" : "PUT";
    const { _id, ...noteData } = note;
    const body = isNew ? JSON.stringify(noteData) : JSON.stringify(note);

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const savedNote = isNew ? { ...note, _id: data.notes._id } : note;

      setAllNotes((prevNotes) => {
        const updatedNotes = isNew
          ? [...prevNotes, savedNote]
          : prevNotes.map((n) => (n._id === savedNote._id ? savedNote : n));

        if (isNew) {
          return updatedNotes.sort(
            (a, b) =>
              new Date(b.creationDate).getTime() -
              new Date(a.creationDate).getTime()
          );
        }
        return updatedNotes;
      });

      if (isNew) {
        setSingleNote(savedNote);
        setIsNewNote(false);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const debouncedSaveNote = useMemo(
    () =>
      debounce((note: SingleNoteType, isNew: boolean) => {
        saveNoteInDB(note, isNew);
      }, 500),
    []
  );

  useEffect(() => {
    if (singleNote && singleNote.title !== "") {
      debouncedSaveNote(singleNote, isNewNote);
    }
  }, [singleNote, isNewNote]);

  useEffect(() => {
    if (selectedLanguage && singleNote) {
      const newLanguage = selectedLanguage.name;
      const updateSingleNote: SingleNoteType = {
        ...singleNote,
        language: newLanguage,
      };

      const updateAllNotes = allNotes.map((note) => {
        if (note._id === singleNote._id) {
          return updateSingleNote;
        }
        return note;
      });
      setAllNotes(updateAllNotes);

      setSingleNote(updateSingleNote);
    }
  }, [selectedLanguage]);

  return (
    <div
      className={`  ${isMobile ? "w-4/5 mt-[50%] shadow-lg h-[1040px]" : "w-1/2"}  p-6 z-30   rounded-lg ${openContentNote ? "block " : "hidden"} h-[100%] pb-9
      ${isMobile ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" : ""} ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} `}
    >
      {singleNote && (
        <div>
          <ContentNoteHeader
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <ContentNoteTags
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <ContentDescription
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
          <ContentCodeBlock
            singleNote={singleNote}
            setSingleNote={setSingleNote}
          />
        </div>
      )}
    </div>
  );
};

export default ContentNote;
