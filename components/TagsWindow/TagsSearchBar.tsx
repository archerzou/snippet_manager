"use client";

import React, { useEffect, useRef } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useGlobalContext } from "@/context/ContextApi";

const TagsSearchBar = ({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();

  const inputRef = useRef<HTMLInputElement>(null!);
  useEffect(() => {
    inputRef.current?.focus();
  }, [openTagsWindow]);

  return (
    <div className="flex  gap-5 items-center justify-between mt-11 relative ">
      <div
        className={`h-[42px] flex items-center text-sm  rounded-md  pl-3 gap-1 w-[85%] ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"}  `}
      >
        <SearchRoundedIcon className="text-slate-400" />
        <input
          ref={inputRef}
          value={searchQuery}
          placeholder="Search a tag..."
          className="bg-transparent outline-none w-full font-light"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <button
        onClick={() => setOpenNewTagsWindow(true)}
        className="bg-purple-600 ml-2 p-[10px] flex w-[15%] text-sm rounded-md text-white items-center justify-center max-lg:w-[25%]"
      >
        <AddOutlinedIcon sx={{ fontSize: 17 }} />
        <span className="max-md:hidden">Add Tag</span>
      </button>
    </div>
  );
};

export default TagsSearchBar;
