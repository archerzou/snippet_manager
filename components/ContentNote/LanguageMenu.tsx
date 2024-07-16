"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useGlobalContext } from "@/context/ContextApi";
import { allLanguages } from "@/constants/Languages";
import { SingleCodeLanguageType } from "@/types";

const LanguageMenu = ({
  isOpened,
  setIsOpened,
}: {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}) => {
  const textRef = useRef<HTMLInputElement>(null!);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    darkModeObject: { darkMode },
    selectedLanguageObject: { selectedLanguage, setSelectedLanguage },
  } = useGlobalContext();

  useEffect(() => {
    textRef.current?.focus();
  }, [isOpened]);

  // Filtering logic
  const [filteredLanguages, setFilteredLanguages] = useState(allLanguages);
  const menuRef = useRef<HTMLDivElement>(null!);
  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toLowerCase()); // Lowercase for case-insensitive search
  };

  useEffect(() => {
    // Update filteredLanguages based on search query
    const filtered = allLanguages.filter((language) =>
      language.name.toLowerCase().includes(searchQuery),
    );
    setFilteredLanguages(filtered);
  }, [searchQuery]);

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpened(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const clickedLanguage = (language: SingleCodeLanguageType) => {
    setSelectedLanguage(language);
    setIsOpened(false);
  };

  return (
    <div
      ref={menuRef}
      className={`${darkMode[1].isSelected ? "bg-slate-600  " : " "}   h-[220px]  absolute flex-col gap-2 p-3 w-[250px]  rounded-md left-3 bg-slate-100 z-50 flex   text-slate-400`}
    >
      <div
        className={`i${darkMode[1].isSelected ? "bg-slate-800 " : "bg-slate-200 "}p-1 rounded-md flex gap-1 mb-1`}
      >
        <SearchIcon />
        <input
          ref={textRef}
          placeholder="Search..."
          className="bg-transparent outline-none  "
          onChange={onChangeSearch}
          value={searchQuery}
        />
      </div>

      <div className=" h-40 bg-slate-100 overflow-x-auto  ">
        {filteredLanguages.map((language) => (
          <div
            onClick={() => clickedLanguage(language)}
            key={language.id}
            className={`flex mb-2 gap-2 hover:bg-slate-200 p-[6px] px-3 rounded-md items-center cursor-pointer ${
              selectedLanguage &&
              selectedLanguage.name.toLocaleLowerCase() ===
                language.name.toLocaleLowerCase()
                ? "bg-slate-200"
                : ""
            }`}
          >
            {language.icon}
            <span className="mt-[1px]">{language.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageMenu;
