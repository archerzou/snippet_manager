"use client";

import React from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useGlobalContext } from "@/context/ContextApi";
import { SingleTagType } from "@/types";
import { deleteTag } from "@/lib/utils";

const SingleTag = ({ tag }: { tag: SingleTagType }) => {
  const {
    darkModeObject: { darkMode },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
    tagsClickedObject: { tagsClicked, setTagsClicked },
  } = useGlobalContext();
  const openTagWindow = (tag: SingleTagType) => {
    setOpenNewTagsWindow(true);
    setSelectedTagToEdit(tag);
  };

  //This function count how many this tag found in all notes
  const countTagInAllNotes = (tag: SingleTagType) => {
    let count = 0;
    allNotes.forEach((note) => {
      if (note.tags.some((t) => t.name === tag.name)) {
        count++;
      }
    });
    return count;
  };

  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} p-2 rounded-lg flex gap-3 items-center justify-between px-4 `}
    >
      <div className="flex gap-3 items-center">
        <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
        <div className="flex flex-col">
          <span className="font-bold">{tag.name}</span>
          <span className="text-slate-400 text-[12px]">
            {countTagInAllNotes(tag)} Snippets
          </span>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <div className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300">
          <EditRoundedIcon
            onClick={() => openTagWindow(tag)}
            className=" text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>

        <div
          onClick={() =>
            deleteTag(
              tag,
              allTags,
              setAllTags,
              allNotes,
              setAllNotes,
              tagsClicked,
              setTagsClicked,
            )
          }
          className=" rounded-full w-7 h-7 flex items-center justify-center cursor-pointer bg-slate-200 hover:bg-slate-300"
        >
          <DeleteRoundedIcon
            className=" text-slate-400"
            sx={{ fontSize: 15 }}
          />
        </div>
      </div>
    </div>
  );
};

export default SingleTag;
