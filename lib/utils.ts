import React from "react";
import toast from "react-hot-toast";
import { SingleNoteType, SingleTagType } from "@/types";

export const capitalizeFirstOccurrence = (str: string) => {
  if (!str) return str; // If the string is empty, return it as is.

  for (let i = 0; i < str.length; i++) {
    if (str[i] !== " ") {
      return str.slice(0, i) + str[i].toUpperCase() + str.slice(i + 1);
    }
  }

  return str; // If no non-space characters are found, return the string as is.
};

export const truncateString = (str: string, num: number) => {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
};

export const deleteTag = async (
  tag: SingleTagType,
  allTags: SingleTagType[],
  setAllTags: React.Dispatch<React.SetStateAction<SingleTagType[]>>,
  allNotes: SingleNoteType[],
  setAllNotes: React.Dispatch<React.SetStateAction<SingleNoteType[]>>,
  tagsClicked: string[],
  setTagsClicked: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  try {
    // Step 1: Delete tag from database
    const deleteTagResponse = await fetch(`/api/tags?tagId=${tag._id}`, {
      method: "DELETE",
    });

    if (!deleteTagResponse.ok) {
      const errorData = await deleteTagResponse.json();
      throw new Error(errorData.message || "Failed to delete tag");
    }

    // Step 2: Update all notes that contain this tag
    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some((t) => t.name.toLowerCase() === tag.name.toLowerCase()),
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, tag.name),
    );

    const updatedNotes = await Promise.all(updatePromises);

    // Step 3: Update local state
    const updatedAllTags = allTags.filter(
      (t) => t.name.toLowerCase() !== tag.name.toLowerCase(),
    );
    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.filter(
          (t) => t.name.toLowerCase() !== tag.name.toLowerCase(),
        ),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setTagsClicked(
      tagsClicked.filter((t) => t.toLowerCase() !== tag.name.toLowerCase()),
    );

    toast.success("Tag has been deleted successfully");
  } catch (error) {
    console.error("Error deleting tag:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to delete tag or update notes",
    );
  }
};

const updateNote = async (note: SingleNoteType, tagToRemove: string) => {
  const updatedTags = note.tags.filter(
    (t) => t.name.toLowerCase() !== tagToRemove.toLowerCase(),
  );
  const updateNoteResponse = await fetch(
    `/api/snippets?snippetId=${note._id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...note,
        tags: updatedTags,
      }),
    },
  );

  if (!updateNoteResponse.ok) {
    throw new Error(`Failed to update note ${note._id}`);
  }

  const updatedNote = await updateNoteResponse.json();
  return updatedNote.note;
};
