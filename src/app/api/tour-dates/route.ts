import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tourDates = await prisma.tourDate.findMany({
    orderBy: { date: "asc" },
  });
  return NextResponse.json(tourDates);
}

export async function POST(request: Request) {
  const body = await request.json();

  const tourDate = await prisma.tourDate.create({
    data: {
      date: new Date(body.date),
      time: body.time,
      venue: body.venue,
      address: body.address || null,
      city: body.city || null,
      state: body.state || null,
      zip: body.zip || null,
      url: body.url || null,
      socialLink: body.socialLink || null,
      note: body.note || null,
    },
  });

  return NextResponse.json(tourDate, { status: 201 });
}
