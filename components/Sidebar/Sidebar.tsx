"use client";

import React from "react";
import Logo from "@/components/Logo";
import QuickLinks from "@/components/QuickLinks";
import Languages from "@/components/Languages";
import { useGlobalContext } from "@/context/ContextApi";

const Sidebar = () => {
  const {
    darkModeObject: { darkMode },
    openSideBarObject: { openSideBar, setOpenSideBar },
  } = useGlobalContext();

  return (
    <div
      className={`${openSideBar ? "fixed z-50 shadow-lg" : "max-md:hidden "} pr-10    p-6  flex-col gap-2  min-h-screen      pt-9 ${darkMode[1].isSelected ? "bg-slate-800" : "bg-white"} `}
    >
      <Logo />
      <QuickLinks />
      <Languages />
    </div>
  );
};

export default Sidebar;
