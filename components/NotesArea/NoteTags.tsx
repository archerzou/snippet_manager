"use client";

import React from "react";
import { SingleTagType } from "@/types";

const NoteTags = ({ tags }: { tags: SingleTagType[] }) => {
  return (
    <div className="text-slate-500 text-[11px] mx-4 flex-wrap flex    gap-1 mt-4 ">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="bg-purple-100 text-purple-600 p-1 rounded-md px-2"
        >
          {tag.name}
        </span>
      ))}
    </div>
  );
};

export default NoteTags;
