"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import { useClerk } from "@clerk/nextjs";

const QuickLinks = () => {
  const {
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    tagsAndLogoutMenuObject: { tagsAndLogoutMenu },
  } = useGlobalContext();

  const { signOut } = useClerk();

  const clickedMenu = (index: number) => {
    const updatedSideBarMenu = sideBarMenu.map((menu, i) => {
      if (i === index) {
        return { ...menu, isSelected: true };
      } else {
        return { ...menu, isSelected: false };
      }
    });

    setSideBarMenu(updatedSideBarMenu);
  };

  const clickedTagsAndLogOutMenu = async (index: number) => {
    try {
      if (index === 0) {
        setOpenTagsWindow(true);
      }

      if (index === 1) {
        console.log("clicked log out");
        await signOut();
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="mt-20 text-sm">
      <div className="font-bold text-slate-400">Quick Links</div>
      <ul className="text-slate-400 mt-4 flex flex-col gap-2">
        {sideBarMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedMenu(index)}
            className={`flex  cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-purple-600 text-white" : "text-slate-400 hover:text-purple-600"}  p-[7px] px-2 rounded-md w-[80%]`}
          >
            {menu.icons}
            <span>{menu.name}</span>
          </li>
        ))}
      </ul>

      <ul className="text-slate-400 mt-6 flex flex-col gap-2">
        {tagsAndLogoutMenu.map((menu, index) => (
          <li
            key={index}
            onClick={() => clickedTagsAndLogOutMenu(index)}
            className={`flex cursor-pointer select-none gap-2 items-center ${menu.isSelected ? "bg-purple-600 text-white " : "text-slate-400"}  p-[7px] px-2 rounded-md w-[80%] hover:text-purple-600`}
          >
            {menu.icons}
            <span>{menu.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuickLinks;
