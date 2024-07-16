import React from "react";

const NoteDate = ({ creationDate }: { creationDate: string }) => {
  const getDateOnly = (dateTimeString: string) => {
    // Split the date-time string and return only the date part
    const [date, time] = dateTimeString.split(", ");
    return date; // Keep the month, day, and year part
  };

  return (
    <div className="text-slate-500 text-[11px] flex gap-1 font-light mx-4 mt-1">
      <span className="">{getDateOnly(creationDate)}</span>
    </div>
  );
};

export default NoteDate;
