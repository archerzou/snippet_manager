"use client";

import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useGlobalContext } from "@/context/ContextApi";

const AddTagHeader = () => {
  const {
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
  } = useGlobalContext();
  return (
    <div className="flex justify-between items-center rounded-lg ">
      <div className="flex items-center gap-2">
        {/* <StyleOutlinedIcon className="text-slate-600" /> */}
        <span className="text-[18px] text-slate-600 font-bold">
          {selectedTagToEdit ? "Edit Tag" : "Add New Tag"}
        </span>
      </div>
      <div>
        <CloseIcon
          sx={{ fontSize: 15 }}
          className="text-slate-400 cursor-pointer"
          onClick={() => {
            setOpenNewTagsWindow(false), setSelectedTagToEdit(null);
          }}
        />
      </div>
    </div>
  );
};

export default AddTagHeader;
