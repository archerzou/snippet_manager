"use client";

import React, { useEffect, useLayoutEffect, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import StyleOutlinedIcon from "@mui/icons-material/StyleOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";

import { useGlobalContext } from "@/context/ContextApi";
import SingleNote from "@/components/NotesArea/SingleNote";
import EmptyPlaceHolder from "@/components/EmptyPlaceHolder";

const AllNotesSection = () => {
  const {
    allNotesObject: { allNotes },
    isMobileObject: { isMobile },
    openContentNoteObject: { openContentNote, setOpenContentNote },
    sideBarMenuObject: { sideBarMenu },
    tagsClickedObject: { tagsClicked, setTagsClicked },
    searchQueryObject: { searchQuery, setSearchQuery },
    isLoadingObject: { isLoading },
    showPlaceHolderObject: { showPlaceHolder },
    selectedNoteObject: { selectedNote, setSelectedNote },
  } = useGlobalContext();

  const filterIsTrashedNotes = allNotes.filter(
    (note) => note.isTrash === false,
  );

  const [filteredNotes, setFilteredNotes] = useState(
    allNotes.filter((note) => note.isTrash === false),
  );

  const [isSearching, setIsSearching] = useState(false);

  const [showSkeleton, setShowSkeleton] = useState(true);

  const [displayNotes, setDisplayNotes] = useState(false);

  //Update the filteredNotes based on the searchQuery
  useEffect(() => {
    setIsSearching(searchQuery !== "");

    if (sideBarMenu[0].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }

    if (sideBarMenu[1].isSelected) {
      const updateFilteredNotes = allNotes
        .filter((note) => !note.isTrash && note.isFavorite)
        .filter((note) => {
          return note.title.toLowerCase().includes(searchQuery.toLowerCase());
        });

      setFilteredNotes(updateFilteredNotes);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (isSearching === false) {
      if (sideBarMenu[0].isSelected) {
        setFilteredNotes(filterIsTrashedNotes);

        setTagsClicked(["All"]);
      }

      if (sideBarMenu[1].isSelected) {
        setFilteredNotes(
          allNotes.filter((note) => !note.isTrash && note.isFavorite),
        );
      }
    }
  }, [isSearching]);

  //This useEffect will trigger this code, whenever we make a change in the all Notes
  useEffect(() => {
    //If all Snippets is selected, show all the snippets that are not trashed
    if (sideBarMenu[0].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        setFilteredNotes(allNotes.filter((note) => !note.isTrash));
        return;
      }
      //Filter out based on the tagsClickedArray
      if (tagsClicked.length > 0) {
        const updateNotes = allNotes
          .filter((note) => {
            return tagsClicked.every((selectedTag) =>
              note.tags.some((noteTag) => noteTag.name === selectedTag),
            );
          })
          .filter((note) => !note.isTrash);

        setFilteredNotes(updateNotes);
      }
      // setFilteredNotes(allNotes.filter((note) => !note.isTrash));
    }

    //If favorite is selected, and we make a note as favorite and not trashed
    if (sideBarMenu[1].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter(
          (note) => !note.isTrash && note.isFavorite,
        );
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag),
          );
        })
        .filter((note) => !note.isTrash && note.isFavorite);

      setFilteredNotes(updateNotes);
    }

    if (sideBarMenu[2].isSelected) {
      if (tagsClicked.length === 1 && tagsClicked[0] === "All") {
        const updatesNotes = allNotes.filter((note) => note.isTrash);
        setFilteredNotes(updatesNotes);
        return;
      }

      const updateNotes = allNotes
        .filter((note) => {
          return tagsClicked.every((selectedTag) =>
            note.tags.some((noteTag) => noteTag.name === selectedTag),
          );
        })
        .filter((note) => note.isTrash);

      setFilteredNotes(updateNotes);
    }
  }, [allNotes, tagsClicked]);

  useLayoutEffect(() => {
    if (openContentNote) {
      setOpenContentNote(false);
    }
    //If all Snippets is selected
    if (sideBarMenu[0].isSelected) {
      setFilteredNotes(filterIsTrashedNotes);
    }
    //If favorite is selected, filter favorite notes
    if (sideBarMenu[1].isSelected) {
      const filteredFavoriteNotes = allNotes.filter(
        (note) => !note.isTrash && note.isFavorite,
      );
      setFilteredNotes(filteredFavoriteNotes);
    }

    //If trashed is selected
    if (sideBarMenu[2].isSelected) {
      const filteredTrashedNotes = allNotes.filter((note) => note.isTrash);
      setFilteredNotes(filteredTrashedNotes);
    }
  }, [sideBarMenu]);

  const ShimmerNoteEffect = () => {
    return (
      <div className="h-[380px] w-[300px] bg-white rounded-md flex flex-col  ">
        {/* Header */}
        <div className="flex justify-between px-5 pt-5">
          <div className="w-1/2 h-7 bg-slate-100 rounded-sm"></div>
          <div className="w-7 h-7 bg-slate-100 rounded-sm"></div>
        </div>

        {/* code */}

        <div className="h-[230px] mt-12 w-full bg-slate-200  "></div>
      </div>
    );
  };

  useEffect(() => {
    if (!isLoading) {
      setDisplayNotes(true);
    } else {
      setDisplayNotes(false);
    }
  }, [isLoading]);

  return (
    <div
      className={`mt-5 ${isMobile || openContentNote ? "grid grid-cols-1" : "flex flex-wrap"}  gap-6  `}
    >
      {sideBarMenu[0].isSelected && (
        <>
          {isLoading ? (
            // Show loading shimmer effects when loading
            <>
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
              <ShimmerNoteEffect />
            </>
          ) : (
            <>
              {filteredNotes.filter((note) => !note.isTrash).length === 0 &&
              !isLoading ? (
                isSearching ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <SearchOutlinedIcon
                        className="text-slate-400"
                        sx={{ fontSize: 110 }}
                      />
                    }
                    text={
                      <span className="text-slate-400 text-md text-center">
                        Snippets not found
                      </span>
                    }
                  />
                ) : tagsClicked.filter((tag) => tag !== "All").length > 0 ? (
                  <EmptyPlaceHolder
                    muiIcon={
                      <StyleOutlinedIcon
                        className="text-slate-400"
                        sx={{ fontSize: 110 }}
                      />
                    }
                    text={
                      <span className="text-slate-400 text-md text-center">
                        It looks like there are no <br /> snippets with these
                        tags.
                      </span>
                    }
                  />
                ) : (
                  <>
                    <EmptyPlaceHolder
                      muiIcon={
                        <TextSnippetOutlinedIcon
                          className="text-slate-400"
                          sx={{ fontSize: 110 }}
                        />
                      }
                      text={
                        <span className="text-slate-400 text-md text-center">
                          It looks like there are no <br /> snippets right now.
                        </span>
                      }
                      isNew={true}
                    />
                  </>
                )
              ) : (
                displayNotes &&
                filteredNotes.map((note, noteIndex) => (
                  <div key={noteIndex}>
                    <SingleNote note={note} />
                  </div>
                ))
              )}
            </>
          )}
        </>
      )}

      {sideBarMenu[1].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : isSearching ? (
            <EmptyPlaceHolder
              muiIcon={
                <SearchOutlinedIcon
                  className="text-slate-400"
                  sx={{ fontSize: 110 }}
                />
              }
              text={
                <span className="text-slate-400 text-md text-center">
                  Snippets not found
                </span>
              }
            />
          ) : (
            <EmptyPlaceHolder
              muiIcon={
                <FavoriteBorderOutlinedIcon
                  className="text-slate-400 text-md"
                  sx={{ fontSize: 110 }}
                />
              }
              text={
                <span className="text-slate-400 text-md text-center text-md ">
                  Currently, there are no snippets <br /> marked as favorites.
                </span>
              }
            />
          )}
        </>
      )}

      {sideBarMenu[2].isSelected && (
        <>
          {filteredNotes.length !== 0 ? (
            <>
              {filteredNotes.map((note, noteIndex) => (
                <div key={noteIndex}>
                  <SingleNote note={note} />
                </div>
              ))}
            </>
          ) : (
            <>
              <EmptyPlaceHolder
                muiIcon={
                  <DeleteOutlineOutlined
                    className="text-slate-400"
                    sx={{ fontSize: 110 }}
                  />
                }
                text={
                  <span className="text-slate-400 text-md text-center ">
                    No snippets have been trashed.
                  </span>
                }
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default AllNotesSection;
