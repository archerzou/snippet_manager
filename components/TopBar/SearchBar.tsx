"use client";

import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddSnippetButton from "@/components/TopBar/AddSnippetButton";
import { useGlobalContext } from "@/context/ContextApi";

const SearchBar = () => {
  const {
    darkModeObject: { darkMode },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    searchQueryObject: { searchQuery, setSearchQuery },
  } = useGlobalContext();
  return (
    <div
      className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"}  relative pl-3 w-[60%] h-[38px]   rounded-3xl flex items-center gap-2`}
    >
      <SearchIcon className="text-purple-500" sx={{ fontsize: 13 }} />
      <input
        placeholder="Search a snippet..."
        onChange={(e) => setSearchQuery(e.target.value)}
        value={searchQuery}
        className={` ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} w-[70%] outline-none text-sm  text-slate-500 text-[12px]`}
      />
      <AddSnippetButton />
    </div>
  );
};

export default SearchBar;
