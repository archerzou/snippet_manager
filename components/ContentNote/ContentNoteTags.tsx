"use client";

import React, { useEffect, useState } from "react";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { SingleNoteType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";
import ContentTagsMenu from "@/components/ContentNote/ContentTagsMenu";

interface SingleTagType {
  _id: string;
  name: string;
  clerkUserId: string;
}

const ContentNoteTags = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: React.Dispatch<
    React.SetStateAction<SingleNoteType | undefined>
  >;
}) => {
  const [hovered, setHovered] = useState(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const {
    allNotesObject: { allNotes, setAllNotes },
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  const filterAllFromAllTags = allTags.filter((tag) => tag.name !== "All");

  useEffect(() => {
    if (isOpened) {
      setHovered(true);
    }
  }, [isOpened]);

  const onClickedTag = (tag: SingleTagType) => {
    if (selectedTags.some((t) => t.name === tag.name)) {
      setSelectedTags(selectedTags.filter((t) => t.name !== tag.name));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  useEffect(() => {
    const newSingleNote = { ...singleNote, tags: selectedTags };
    const newAllNotes = allNotes.map((note) => {
      if (note._id === singleNote._id) {
        return newSingleNote;
      }

      return note;
    });

    setAllNotes(newAllNotes);
    setSingleNote(newSingleNote);
  }, [selectedTags]);

  return (
    <div className="flex text-[13px] items-center gap-2">
      <StyleOutlinedIcon
        sx={{ fontSize: 19 }}
        className={`${hovered ? "text-purple-600" : "text-slate-400"}`}
      />
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          if (!isOpened) setHovered(false);
        }}
        className="flex justify-between  w-full relative "
      >
        <div className="flex gap-2 items-center select-none    flex-wrap  ">
          {singleNote.tags.length === 0 && (
            <div className="">
              <span className="bg-slate-100 text-slate-400 p-1 px-2 rounded-md ">
                No Tags
              </span>
            </div>
          )}

          {singleNote.tags.map((tag, index) => (
            <div
              key={index}
              className=" bg-slate-100 text-slate-400 p-1 px-2 rounded-md"
            >
              {tag.name}
            </div>
          ))}
          {hovered && (
            <EditOutlinedIcon
              onClick={() => {
                setIsOpened(!isOpened);
              }}
              sx={{ fontSize: 19 }}
              className="text-slate-400 cursor-pointer "
            />
          )}
        </div>
        {isOpened && filterAllFromAllTags.length > 0 && (
          <ContentTagsMenu
            onClickedTag={(tag) => onClickedTag(tag)}
            setIsOpened={setIsOpened}
          />
        )}
      </div>
    </div>
  );
};

export default ContentNoteTags;
