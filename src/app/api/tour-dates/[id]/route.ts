import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const tourDate = await prisma.tourDate.update({
    where: { id: Number(id) },
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

  return NextResponse.json(tourDate);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  await prisma.tourDate.delete({ where: { id: Number(id) } });

  return NextResponse.json({ success: true });
}
