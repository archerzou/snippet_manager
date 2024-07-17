"use client";

import React from "react";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useGlobalContext } from "@/context/ContextApi";
import EmptyPlaceHolder from "@/components/EmptyPlaceHolder";
import SingleTag from "@/components/TagsWindow/SingleTag";

const TagsList = ({ searchQuery }: { searchQuery: string }) => {
  const {
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
  } = useGlobalContext();
  const filterAllItemFromAllTags = allTags.filter((tag) => tag.name !== "All");
  const filterAllTagsBasedOnSearchQuery = filterAllItemFromAllTags.filter(
    (tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <div
      className={`rounded-md select-none p-3   ${darkMode[1].isSelected ? "bg-slate-600" : "bg-slate-50"} h-[380px] overflow-auto mt-9 flex flex-col gap-4`}
    >
      {filterAllItemFromAllTags.length === 0 && (
        <EmptyPlaceHolder
          muiIcon={
            <StyleOutlinedIcon
              sx={{ fontSize: 66 }}
              className="text-slate-400"
            />
          }
          text={
            <span className="text-slate-400 font-light">
              No tags has been created yet...
            </span>
          }
        />
      )}
      {/*  */}
      {filterAllTagsBasedOnSearchQuery.length === 0 &&
        filterAllItemFromAllTags.length !== 0 && (
          <EmptyPlaceHolder
            muiIcon={
              <SearchRoundedIcon
                sx={{ fontSize: 66 }}
                className="text-slate-400"
              />
            }
            text={<span className="text-slate-400">No Tags Found</span>}
          />
        )}
      {filterAllTagsBasedOnSearchQuery.map((tag, index) => (
        <div key={index}>
          <SingleTag tag={tag} />
        </div>
      ))}
    </div>
  );
};

export default TagsList;
