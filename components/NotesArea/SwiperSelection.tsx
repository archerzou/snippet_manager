"use client";

import React, { useEffect, useState } from "react";
import { useGlobalContext } from "@/context/ContextApi";

const SwiperSelection = () => {
  const {
    darkModeObject: { darkMode },
    openNewTagsWindowObject: { setOpenNewTagsWindow },
    allTagsObject: { allTags, setAllTags },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    sideBarMenuObject: { sideBarMenu, setSideBarMenu },
    searchQueryObject: { searchQuery, setSearchQuery },
    isLoadingObject: { isLoading },
  } = useGlobalContext();

  const [tagsSelected, setTagsSelected] = useState<boolean[]>([]);

  useEffect(() => {
    if (searchQuery.trim().length === 0) {
      const newTagsSelected = Array(allTags.length).fill(false);
      newTagsSelected[0] = true;
      setTagsSelected(newTagsSelected);
    }
  }, [searchQuery]);
};

export default SwiperSelection;
