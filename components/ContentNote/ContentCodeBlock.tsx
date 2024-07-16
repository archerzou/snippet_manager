"use client";

import React, { useEffect, useState } from "react";
import AceEditor from "react-ace";
import CodeOutlinedIcon from "@mui/icons-material/CodeOutlined";
import { IconButton } from "@mui/material";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import { SingleNoteType } from "@/types";
import { useGlobalContext } from "@/context/ContextApi";
import { allLanguages } from "@/constants/Languages";
import LanguageMenu from "@/components/ContentNote/LanguageMenu";

const ContentCodeBlock = ({
  singleNote,
  setSingleNote,
}: {
  singleNote: SingleNoteType;
  setSingleNote: (value: SingleNoteType) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const {
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
    selectedNoteObject: { selectedNote, setSelectedNote },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();

  useEffect(() => {
    if (selectedNote) {
      //If selectedNote is not empty when we click on add a snippet
      //set the selectedLanguage to the first language in the allLanguages array
      if (selectedNote.language === "") {
        setSelectedLanguage(allLanguages[0]);
        return;
      }
      const findLanguage = allLanguages.find(
        (language) =>
          language.name.toLocaleLowerCase() ===
          selectedNote.language.toLocaleLowerCase(),
      );

      if (findLanguage) {
        setSelectedLanguage(findLanguage);
      }
    }
  }, [selectedNote]);

  const handleChange = (code: string) => {
    const newSingleNote = { ...singleNote, code: code };
    const updateAllNotes = allNotes.map((note) => {
      if (note._id === singleNote._id) {
        return newSingleNote;
      }

      return note;
    });
    setAllNotes(updateAllNotes);
    setSingleNote(newSingleNote);
  };

  const clickedCopyBtn = () => {
    navigator.clipboard.writeText(singleNote.code);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  };

  return (
    <div className="flex gap-2  text-[12px] text-slate-400 mt-8 relative">
      <CodeOutlinedIcon
        sx={{ fontSize: 18 }}
        className={` mt-[9px] ${isHovered ? "text-purple-600" : "text-slate-400"}`}
      />

      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`${isHovered ? "border-purple-600" : ""} border rounded-lg p-3 pt-16 w-full relative`}
      >
        <div className="absolute top-4 right-4 z-40">
          <IconButton disabled={isCopied}>
            {isCopied ? (
              <DoneAllOutlinedIcon
                sx={{ fontSize: 18 }}
                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`}
              />
            ) : (
              <ContentCopyOutlinedIcon
                onClick={() => clickedCopyBtn()}
                sx={{ fontSize: 18 }}
                className={`${darkMode[1].isSelected ? "text-white" : "text-slate-400"}`}
              />
            )}
          </IconButton>
        </div>

        {/* Language drop down */}
        <div
          onClick={() => setIsOpened(!isOpened)}
          className={`flex gap-2 justify-between   bg-slate-100 p-[6px] px-3 rounded-md items-center text-[12px]  mt-3 
            absolute top-1 left-3 ${darkMode[1].isSelected ? "bg-slate-600 text-white" : "bg-slate-100 text-slate-400"} cursor-pointer`}
        >
          <div className="flex gap-1 items-center">
            {/* <SiJavascript size={15} className="text-slate-400  " /> */}
            {selectedLanguage?.icon}
            <span className="mt-[1px]">{selectedLanguage?.name}</span>
          </div>
          {isOpened ? (
            <KeyboardArrowUpOutlinedIcon sx={{ fontSize: 18 }} />
          ) : (
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 18 }} />
          )}
        </div>
        {isOpened && (
          <LanguageMenu isOpened={isOpened} setIsOpened={setIsOpened} />
        )}

        <AceEditor
          placeholder="Your code..."
          mode="javascript"
          theme="tomorrow"
          name="blah2"
          width="100%"
          height="1500px"
          fontSize={14}
          lineHeight={19}
          showPrintMargin={false}
          showGutter={false}
          highlightActiveLine={false}
          style={{
            backgroundColor: "transparent",
            color: darkMode[1].isSelected ? "white" : "black",
          }}
          value={singleNote.code}
          onChange={handleChange}
          setOptions={{
            enableBasicAutocompletion: false,
            enableLiveAutocompletion: false,
            enableSnippets: false,
            showLineNumbers: false,
            tabSize: 2,
          }}
        />
      </div>
    </div>
  );
};

export default ContentCodeBlock;
