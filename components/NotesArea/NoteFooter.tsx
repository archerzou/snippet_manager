"use client";
import React from "react";
import toast from "react-hot-toast";
import ReplayIcon from "@mui/icons-material/Replay";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import RestoreFromTrashOutlinedIcon from "@mui/icons-material/RestoreFromTrashOutlined";
import { SingleNoteType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";
import LanguageTextToIcon from "@/components/LanguageTextToIcon";

const NoteFooter = ({
  language,
  note,
}: {
  language: string;
  note: SingleNoteType;
}) => {
  const {
    allNotesObject: { allNotes, setAllNotes },
    darkModeObject: { darkMode },
    openConfirmationWindowObject: {
      setOpenConfirmationWindow,
      openConfirmationWindow,
    },
    selectedNoteObject: { setSelectedNote },
    showPlaceHolderObject: { setShowPlaceHolder },
    openContentNoteObject: { openContentNote, setOpenContentNote },
  } = useGlobalContext();

  const resetNoteFunction = async (noteId: string) => {
    try {
      const response = await fetch(`/api/snippets?snippetId=${noteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: false }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) => (n._id === noteId ? { ...n, isTrash: false } : n)),
      );

      setShowPlaceHolder(false);

      toast.success("Note restored from trash");
    } catch (error) {
      console.error("Error restoring note from trash:", error);
      // Optionally, show an error toast to the user
    }
  };

  const trashNoteFunction = async () => {
    if (note.isTrash) {
      setOpenConfirmationWindow(true);
      setSelectedNote(note);

      return;
    }

    try {
      const response = await fetch(`/api/snippets?snippetId=${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isTrash: true }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const updatedNote = await response.json();

      setAllNotes((prevNotes) =>
        prevNotes.map((n) =>
          n._id === note._id ? { ...n, isTrash: true } : n,
        ),
      );

      setShowPlaceHolder(true);

      toast((t) => (
        <div className={`flex gap-2 items-center`}>
          <span className="text-sm">Note has been moved to trash</span>
          <button
            className="bg-purple-600 p-[4px] px-3 text-sm text-white rounded-md flex gap-1 items-center"
            onClick={() => {
              toast.dismiss(t.id);
              resetNoteFunction(note._id);
            }}
          >
            <ReplayIcon sx={{ fontSize: 17 }} />
            <span>Undo</span>
          </button>
        </div>
      ));
    } catch (error) {
      console.error("Error moving note to trash:", error);
      // Optionally, show an error toast to the user
    }
  };

  return (
    <div className=" flex justify-between   text-[13px] text-slate-400 mx-4 mt-3">
      <div className="flex gap-1 items-center">
        {LanguageTextToIcon(language)}
        <span>{language}</span>
      </div>
      <div className="flex gap-2 items-center">
        {note.isTrash && (
          <RestoreFromTrashOutlinedIcon
            onClick={() => resetNoteFunction(note._id)}
            sx={{ fontSize: 17 }}
            className="cursor-pointer"
          />
        )}

        <DeleteRoundedIcon
          onClick={trashNoteFunction}
          sx={{ fontSize: 17 }}
          className={`cursor-pointer ${note.isTrash && "text-purple-600"} ${openContentNote ? "hidden" : ""}`}
        />
      </div>
    </div>
  );
};

export default NoteFooter;
