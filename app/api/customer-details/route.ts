import MOCK_DATA from "@/lib/MOCK_DATA.json";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

const { auth } = NextAuth({
  ...authConfig,
  session: {
    ...authConfig.session,
    strategy: "jwt" 
  }
});

export const GET = async (req: Request): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  const data = MOCK_DATA.find((item) => item.id === Number(id));

  if (!data) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json({ data }, { status: 200 });
};
