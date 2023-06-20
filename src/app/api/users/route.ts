import {users} from "@/utils/mockups";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
  return NextResponse.json({status: 200, data: users});
}

export async function POST(request: Request) {
  const data = request.json();
  console.log(data);

  return data;
}
