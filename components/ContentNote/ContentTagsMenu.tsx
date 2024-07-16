"use client";

import React, { useEffect, useRef } from "react";
import { SingleTagType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";

const ContentTagsMenu = ({
  onClickedTag,
  setIsOpened,
}: {
  setIsOpened: (value: boolean) => void;
  onClickedTag: (tag: SingleTagType) => void;
}) => {
  const {
    allTagsObject: { allTags },
    selectedTagsObject: { selectedTags, setSelectedTags },
  } = useGlobalContext();

  const tagsRef = useRef<HTMLDivElement>(null!);

  //Get rid from the All elements in the all Tags array
  const filterAllItemsFromAllTags = allTags.filter((tag) => tag.name !== "All");

  const handleClickOutside = (event: MouseEvent) => {
    if (tagsRef.current && !tagsRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={tagsRef}
      className="absolute top-10 bg-slate-100 w-[60%] p-3 rounded-md flex flex-col gap-2 z-50"
    >
      {filterAllItemsFromAllTags.map((tag) => (
        <span
          key={tag._id}
          onClick={() => onClickedTag(tag)}
          className={`
                ${
                  selectedTags.some(
                    (t) =>
                      t.name.toLowerCase() === tag.name.toLocaleLowerCase(),
                  )
                    ? "bg-slate-300 "
                    : ""
                }
                p-1 px-2 select-none cursor-pointer hover:bg-slate-300 text-slate-500 rounded-md transition-all
              `}
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default ContentTagsMenu;
