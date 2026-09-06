import { NextResponse } from "next/server";
import { addReport, loadReports } from "@/lib/store";

export async function GET() {
  return NextResponse.json(await loadReports());
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.member || !body.workedOn || typeof body.hours !== "number") {
    return NextResponse.json(
      { error: "member / workedOn / hours は必須です" },
      { status: 400 }
    );
  }

  const created = await addReport({
    member: body.member,
    workedOn: body.workedOn,
    hours: body.hours,
  });

  return NextResponse.json(created, { status: 201 });
}
