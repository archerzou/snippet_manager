import connect from "@/lib/connect";

import SnippetM from "@/models/SnippetSchema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    } = await req.json();

    await connect();

    const note = new SnippetM({
      title,
      isFavorite,
      clerkUserId,
      tags,
      description,
      code,
      language,
      creationDate,
      isTrash,
    });

    const savedNote = await note.save();
    return NextResponse.json({ notes: savedNote });
  } catch (error) {
    console.log(error);

    return NextResponse.json({ error: error }, { status: 400 });
  }
}

export async function GET(req: any) {
  try {
    const clerkId = req.nextUrl.searchParams.get("clerkId");
    await connect();
    const notes = await SnippetM.find({ clerkUserId: clerkId });
    return NextResponse.json({ notes: notes });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 400 });
  }
}
