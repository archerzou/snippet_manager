"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import TopBar from "@/components/TopBar/TopBar";

const ContentArea = () => {
  const {
    darkModeObject: { darkMode },
  } = useGlobalContext();
  return (
    <div
      className={`w-full ${darkMode[1].isSelected ? "bg-slate-700" : "bg-slate-100"} p-5 `}
    >
      <TopBar />
      {/*<NotesArea />*/}
    </div>
  );
};

export default ContentArea;
