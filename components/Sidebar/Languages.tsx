"use client";

import React from "react";
import { useGlobalContext } from "@/context/ContextApi";
import LanguageTextToIcon from "@/components/Sidebar/LanguageTextToIcon";
import { capitalizeFirstOccurrence } from "@/lib/utils";

const Languages = () => {
  const {
    codeLanguageCounterObject: { codeLanguagesCounter },
  } = useGlobalContext();
  return (
    <div className="mt-12 text-sm">
      {codeLanguagesCounter.length > 0 && (
        <>
          <div className="font-bold text-slate-400">Languages</div>
          <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
            {codeLanguagesCounter.map((language, index) => (
              <div key={index} className="flex justify-between">
                <div className="flex gap-2 items-center">
                  {LanguageTextToIcon(
                    capitalizeFirstOccurrence(language.language),
                  )}
                  <span> {capitalizeFirstOccurrence(language.language)}</span>
                </div>
                <span className="font-bold">{language.count}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Languages;
