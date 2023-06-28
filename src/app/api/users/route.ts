import {cookies} from "next/dist/client/components/headers";
import {NextRequest, NextResponse} from "next/server";
import {verify} from "../jwt";

export async function GET(request: NextRequest) {
  const token = cookies().get("access_token");
  if (token) {
    try {
      const verify_res = await verify(token.value);
      if (verify_res) {
        return NextResponse.json({...JSON.parse(verify_res.payload as string)});
      }
    } catch (err) {
      console.log(err);
    }
  }

  return NextResponse.json(null);
}

export async function POST(request: NextRequest) {
  const data = request.json();

  return data;
}
