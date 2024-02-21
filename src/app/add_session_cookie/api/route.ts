import { cookies } from "next/headers";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req: NextApiRequest, res: NextResponse) {
  const { sessionId } = req.body;

  cookies().set("JSESSIONID", sessionId);

  return NextResponse.json({ text: "Session cookie set" }, { status: 200 });
}