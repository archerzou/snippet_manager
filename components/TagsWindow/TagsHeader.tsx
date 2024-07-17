"use client";

import React from "react";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "@/context/ContextApi";

const TagsHeader = () => {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center  ">
      <div className="flex items-center gap-2">
        <StyleOutlinedIcon />
        <span className="text-lg font-bold  ">Tags</span>
      </div>
      <div onClick={() => setOpenTagsWindow(false)}>
        <CloseIcon
          sx={{ fontSize: 16 }}
          className="text-slate-400 cursor-pointer "
        />
      </div>
    </div>
  );
};

export default TagsHeader;
