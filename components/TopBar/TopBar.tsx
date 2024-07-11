"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import ProfileUser from "@/components/TopBar/ProfileUser";

const TopBar = () => {
  const {
    darkModeObject: { darkMode },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div
      className={`${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"} rounded-lg flex justify-between items-center  p-3`}
    >
      <ProfileUser />
      <SearchBar />
      <div className="flex gap-4   items-center">
        <DarkMode />
        {isMobile && <SideBarMenuIcon />}
      </div>
    </div>
  );
};

export default TopBar;
