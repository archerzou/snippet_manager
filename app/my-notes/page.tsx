"use client";

import React from "react";

import toast, { Toaster } from "react-hot-toast";
import { useGlobalContext } from "@/context/ContextApi";
import ConfirmationWindow from "@/components/ConfirmationWindow";
import Sidebar from "@/components/Sidebar/Sidebar";
import ContentArea from "@/components/ContentArea/ContentArea";

const Page = () => {
  const {
    darkModeObject: { darkMode },
    openConfirmationWindowObject: { openConfirmationWindow },
    openNewTagsWindowObject: { openNewTagsWindow },
    openTagsWindowObject: { openTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex">
      {openConfirmationWindow && (
        <div className="fixed w-full h-full bg-black z-50 opacity-20"></div>
      )}
      <ConfirmationWindow />
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: darkMode[1].isSelected ? "#1E293B" : "white",
            color: darkMode[1].isSelected ? "white" : "black",
          },
        }}
      />
      <Sidebar />
      <ContentArea />
    </div>
  );
};

export default Page;
