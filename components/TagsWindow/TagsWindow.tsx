"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/ContextApi";
import { SingleNoteType, SingleTagType } from "@/types";
import TagsHeader from "@/components/TagsWindow/TagsHeader";
import TagsSearchBar from "@/components/TagsWindow/TagsSearchBar";
import TagsList from "@/components/TagsWindow/TagsList";

const TagsWindow = () => {
  const {
    openTagsWindowObject: { openTagsWindow, setOpenTagsWindow },
    darkModeObject: { darkMode },
    allTagsObject: { allTags, setAllTags },
    allNotesObject: { allNotes, setAllNotes },
  } = useGlobalContext();
  const [searchQuery, setSearchQuery] = useState("");

  interface Tag {
    name: string;
  }

  interface TagCount {
    [key: string]: number;
  }

  const countTags = (
    notes: any[],
    allTags: Tag[],
  ): { name: string; count: number }[] => {
    // Initialize tagCount with all tags set to 0
    const tagCount: TagCount = allTags.reduce((acc, tag) => {
      acc[tag.name] = 0;
      return acc;
    }, {});

    // Count occurrences of tags in notes
    notes.forEach((note) => {
      note.tags.forEach((tag: Tag) => {
        tagCount[tag.name]++;
      });
    });

    // Convert to array of objects and update "All" count
    return allTags
      .map((tag) => {
        if (tag.name === "All") {
          return { name: "All", count: allNotes.length }; // Set count to 7 for "All"
        }
        return { name: tag.name, count: tagCount[tag.name] };
      })
      .sort((a, b) => b.count - a.count);
  };

  const sortAllTags = (
    notes: SingleNoteType[],
    allTags: SingleTagType[],
  ): SingleTagType[] => {
    // First, get the count of tags
    const tagCounts = countTags(notes, allTags);

    // Create a map for quick lookup of counts
    const countMap = new Map(tagCounts.map((item) => [item.name, item.count]));

    // Sort the allTags array
    return [...allTags].sort((a, b) => {
      // Always keep "All" at the top
      if (a.name === "All") return -1;
      if (b.name === "All") return 1;

      // Sort by count (descending), then alphabetically if counts are equal
      const countDiff =
        (countMap.get(b.name) || 0) - (countMap.get(a.name) || 0);
      return countDiff !== 0 ? countDiff : a.name.localeCompare(b.name);
    });
  };

  // Usage
  const sortedTags: SingleTagType[] = sortAllTags(allNotes, allTags);

  //This useEffect will clear the search query if something changes in the allTags Array
  useEffect(() => {
    setSearchQuery("");
  }, [allTags]);

  useEffect(() => {
    setAllTags(sortedTags);
  }, [allNotes]);

  return (
    <div
      style={{
        left: "0",
        right: "0",
        marginLeft: "auto",
        marginRight: "auto",
        top: "45px",
      }}
      className={`${openTagsWindow ? "fixed" : "hidden"} ${darkMode[1].isSelected ? "bg-slate-800 text-white" : "bg-white"}    h-[600px] max-sm:w-[430px] w-[60%] z-40 p-9   shadow-md rounded-md`}
    >
      <TagsHeader />
      <TagsSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      <TagsList searchQuery={searchQuery} />
    </div>
  );
};

export default TagsWindow;
