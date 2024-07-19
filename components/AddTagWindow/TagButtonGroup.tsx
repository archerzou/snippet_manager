"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import { addNewTagFunction, handleEditTag } from "@/lib/addNewTagFunction";

const TagButtonGroup = ({
  tagName,
  setErrorMessage,
}: {
  tagName: string;
  setErrorMessage: (e: string) => void;
}) => {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sharedUserIdObject: { sharedUserId },
  } = useGlobalContext();

  const handleClickedTag = () => {
    // Check if the tag already exists

    if (tagName.trim().length === 0) {
      setErrorMessage("Tag name is still empty!");
      return;
    }

    if (!allTags.some((tag) => tag.name === tagName)) {
      if (!selectedTagToEdit) {
        addNewTagFunction(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          tagName,
          sharedUserId,
        );
      } else {
        handleEditTag(
          allTags,
          setAllTags,
          setOpenNewTagsWindow,
          selectedTagToEdit,
          setSelectedTagToEdit,
          tagName,
          allNotes,
          setAllNotes,
        );
      }

      let newTagClicked = [];
      newTagClicked.push("All");
      setTagsClicked(newTagClicked);
    } else {
      setErrorMessage("Tag already exists");
    }
  };

  return (
    <div className="flex justify-end mt-6 gap-2 text-[12px]">
      <button
        onClick={() => {
          setOpenNewTagsWindow(false);
          setSelectedTagToEdit(null);
        }}
        className="px-4 py-2  text-slate-600 border rounded-md hover:bg-slate-100"
      >
        Cancel
      </button>
      <button
        onClick={handleClickedTag}
        className="px-4 py-2   text-white bg-purple-600 rounded-md hover:bg-purple-700"
      >
        {selectedTagToEdit ? "Edit Tag" : "Add Tag"}
      </button>
    </div>
  );
};

export default TagButtonGroup;
