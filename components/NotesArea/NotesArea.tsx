"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import SwiperSelection from "@/components/NotesArea/SwiperSelection";

const NotesArea = () => {
  const {
    openContentNoteObject: { openContentNote },
    isMobileObject: { isMobile },
  } = useGlobalContext();
  return (
    <div className=" flex gap-2 mt-5">
      <div
        className={`${openContentNote ? `${isMobile ? "w-full" : "w-[50%]"}` : "w-full"}`}
      >
        <SwiperSelection />
        <AllNotesSection />
      </div>
      <ContentNote />
    </div>
  );
};

export default NotesArea;
