"use client";

import React from "react";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Checkbox } from "@mui/material";
import { useGlobalContext } from "@/context/ContextApi";

import { truncateString } from "@/lib/utils";

const NoteHeader = ({
  id,
  title,
  isFavorite,
  isTrashed,
}: {
  id: string;
  title: string;
  isFavorite: boolean;
  isTrashed: boolean;
}) => {
  const {
    openContentNoteObject: { setOpenContentNote },
    allNotesObject: { allNotes, setAllNotes },
    selectedNoteObject: { setSelectedNote, selectedNote },
    isNewNoteObject: { setIsNewNote },
    searchQueryObject: { setSearchQuery },
  } = useGlobalContext();

  const clickedNoteTitle = () => {
    // Getting the note based on the id
    const findTheNote = allNotes.find((note) => note._id === id);

    if (findTheNote) {
      setSelectedNote(findTheNote);
    }
    // Opening up the content note component only if the note is not trashed
    if (!isTrashed) {
      setOpenContentNote(true);
    }

    setIsNewNote(false);

    // Scroll the window to the top
    window.scrollTo({ top: 0, behavior: "smooth" });
    setSearchQuery("");
  };

  const handleClickedCheckbox = async () => {
    const currentFavorite = isFavorite;
    const newFavorite = !currentFavorite;

    try {
      const response = await fetch(`/api/snippets?snippetId=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: newFavorite }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === id ? { ...note, isFavorite: newFavorite } : note,
        ),
      );

      setSearchQuery("");
    } catch (error) {
      console.error("Error updating favorite status:", error);
      // Optionally, revert the UI change if the API call fails
      // setIsFavorite(currentFavorite);
    }
  };

  return (
    <div className="flex  justify-between   items-center     mx-4 ">
      <span
        onClick={() => clickedNoteTitle()}
        className={`font-bold text-lg  w-[90%]     cursor-pointer hover:text-purple-600 `}
      >
        {truncateString(title, 60)}
      </span>

      {!isTrashed && (
        <Checkbox
          icon={
            <FavoriteBorderOutlinedIcon className="text-slate-400 cursor-pointer" />
          }
          checkedIcon={
            <FavoriteIcon className="text-purple-600 cursor-pointer" />
          }
          checked={isFavorite}
          onClick={handleClickedCheckbox}
        />
      )}
    </div>
  );
};

export default NoteHeader;
