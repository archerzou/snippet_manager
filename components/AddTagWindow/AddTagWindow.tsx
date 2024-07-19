"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/ContextApi";
import AddTagHeader from "@/components/AddTagWindow/AddTagHeader";
import AddTagInput from "@/components/AddTagWindow/AddTagInput";
import TagButtonGroup from "@/components/AddTagWindow/TagButtonGroup";

const AddTagWindow = () => {
  const {
    openNewTagsWindowObject: { openNewTagsWindow, setOpenNewTagsWindow },
    darkModeObject: { darkMode },
    selectedTagToEditObject: { selectedTagToEdit, setSelectedTagToEdit },
  } = useGlobalContext();

  const [tagName, setTagName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setErrorMessage("");
    setTagName(newValue);
  };
  // Reset the form when the openNewTagsWindow state changes
  useEffect(() => {
    if (openNewTagsWindow) {
      setTagName("");
      setErrorMessage("");
      return;
    }
  }, [openNewTagsWindow]);

  useEffect(() => {
    if (selectedTagToEdit) {
      setTagName(selectedTagToEdit.name);
    }
  }, [selectedTagToEdit]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "100px",
      }}
      className={`${openNewTagsWindow ? "fixed" : "hidden"} max-sm:w-[350px] w-[500px] shadow-md ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white border"}     z-50 p-6 rounded-lg`}
    >
      <AddTagHeader />
      <AddTagInput
        tagName={tagName}
        onInputChange={onInputChange}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
      />
      <TagButtonGroup tagName={tagName} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default AddTagWindow;
