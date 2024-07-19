"use client";

import React, { useEffect, useRef, useState } from "react";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { useGlobalContext } from "@/context/ContextApi";
import { tagSuggestions } from "@/constants/tagSuggestions";

const AddTagInput = ({
  tagName,
  onInputChange,
  errorMessage,
  setErrorMessage,
}: {
  tagName: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  setErrorMessage: (errorMessage: string) => void;
}) => {
  const {
    openNewTagsWindowObject: { openNewTagsWindow },
    darkModeObject: { darkMode },
  } = useGlobalContext();

  const [placeholder, setPlaceholder] = useState("");
  const inputRef = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    inputRef.current?.focus();
    const randomIndex = Math.floor(Math.random() * tagSuggestions.length);
    setPlaceholder(`e.g., ${tagSuggestions[randomIndex]}`);
  }, [openNewTagsWindow]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [errorMessage, setErrorMessage]);

  return (
    <div className="mt-6">
      <span className="text-slate-400 text-sm font-semibold">Tag Name</span>
      <input
        ref={inputRef}
        value={tagName}
        onChange={(e) => onInputChange(e)}
        placeholder={placeholder}
        className={`${darkMode[1].isSelected ? "bg-slate-700" : "bg-white border"} w-full  rounded-md p-2 mt-1 text-[12px] outline-none text-slate-600`}
      />
      {errorMessage.length > 0 && (
        <div className="text-red-500 flex mt-2 gap-1 items-center ">
          <ErrorOutlineOutlinedIcon fontSize="small" className=" " />
          <span className="text-red-500 text-[11px]">{errorMessage}</span>
        </div>
      )}
    </div>
  );
};

export default AddTagInput;
