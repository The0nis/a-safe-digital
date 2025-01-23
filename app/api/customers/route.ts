import MOCK_DATA from "@/lib/MOCK_DATA.json";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";


const { auth } = NextAuth(authConfig);

export const GET = async (req: Request): Promise<NextResponse> => {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const per_page = Number(searchParams.get("per_page")) || 10;
  const current_page = Number(searchParams.get("current_page")) || 1;
  const search = searchParams.get("search") || "";


  let filteredData = MOCK_DATA as Data[];

  if (search.trim() !== "") {
    const searchLower = search.trim().toLowerCase();
    filteredData = filteredData.filter(
      (item) =>
        item.first_name?.toLowerCase().includes(searchLower) ||
        item.last_name?.toLowerCase().includes(searchLower)
    );
  }
  const total_records = filteredData.length;
  const total_pages = Math.ceil(total_records / per_page);
  const start = (current_page - 1) * per_page;
  const end = start + per_page;
  const data = filteredData.slice(start, end);

  const remaining_pages = Math.max(total_pages - current_page, 0);

  return NextResponse.json(
    {
      data,
      meta: {
        current_page: Number(current_page),
        per_page: Number(per_page),
        total_pages,
        remaining_pages,
        total_count: total_records,
      },
    },
    {
      status: 200,
    }
  );
};
