import React from "react";
import toast from "react-hot-toast";
import { SingleNoteType, SingleTagType } from "@/types";

export const addNewTagFunction = async (
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  tagName: string,
  sharedUserId: string,
) => {
  const newTag = {
    name: tagName,
    clerkUserId: sharedUserId || "",
  };

  try {
    const response = await fetch("/api/tags", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTag),
    });

    if (!response.ok) {
      throw new Error("Failed to add tag");
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    const addedTag: SingleTagType = {
      _id: data.tags._id,
      name: data.tags.name,
      clerkUserId: data.tags.clerkUserId,
    };

    setAllTags((prevTags) => [...prevTags, addedTag]);
    setOpenNewTagsWindow(false);
    toast.success("Tag has been added successfully");
  } catch (error) {
    console.error("Error adding new tag:", error);
    toast.error(error instanceof Error ? error.message : "Failed to add tag");
  }
};

//Edit The Tag in the database
//---------------------------

const updateNote = async (
  note: SingleNoteType,
  oldTagName: string,
  newTagName: string,
) => {
  const updatedTags = note.tags.map((tag) =>
    tag.name.toLowerCase() === oldTagName.toLowerCase()
      ? { ...tag, name: newTagName }
      : tag,
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

export const handleEditTag = async (
  allTags: SingleTagType[],
  setAllTags: (value: React.SetStateAction<SingleTagType[]>) => void,
  setOpenNewTagsWindow: (value: React.SetStateAction<boolean>) => void,
  selectedTagToEdit: SingleTagType,
  setSelectedTagToEdit: (
    value: React.SetStateAction<SingleTagType | null>,
  ) => void,
  newTagName: string,
  allNotes: SingleNoteType[],
  setAllNotes: (value: React.SetStateAction<SingleNoteType[]>) => void,
) => {
  try {
    // Step 1: Update tag in the database
    const updateTagResponse = await fetch(
      `/api/tags?tagId=${selectedTagToEdit._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newTagName }),
      },
    );

    if (!updateTagResponse.ok) {
      const errorData = await updateTagResponse.json();
      throw new Error(errorData.message || "Failed to update tag");
    }

    // Step 2: Update all notes that contain this tag
    const notesToUpdate = allNotes.filter((note) =>
      note.tags.some(
        (t) => t.name.toLowerCase() === selectedTagToEdit.name.toLowerCase(),
      ),
    );

    const updatePromises = notesToUpdate.map((note) =>
      updateNote(note, selectedTagToEdit.name, newTagName),
    );

    const updatedNotes = await Promise.all(updatePromises);

    // Step 3: Update local state
    const updatedAllTags = allTags.map((tag) =>
      tag._id === selectedTagToEdit._id ? { ...tag, name: newTagName } : tag,
    );

    const updatedAllNotes = allNotes.map((note) => {
      const updatedNote = updatedNotes.find((un) => un._id === note._id);
      if (updatedNote) {
        return updatedNote;
      }
      return {
        ...note,
        tags: note.tags.map((tag) =>
          tag.name.toLowerCase() === selectedTagToEdit.name.toLowerCase()
            ? { ...tag, name: newTagName }
            : tag,
        ),
      };
    });

    setAllTags(updatedAllTags);
    setAllNotes(updatedAllNotes);
    setOpenNewTagsWindow(false);
    setSelectedTagToEdit(null);

    toast.success("Tag has been updated successfully");
  } catch (error) {
    console.error("Error updating tag:", error);
    toast.error(
      error instanceof Error
        ? error.message
        : "Failed to update tag or related notes",
    );
  }
};
