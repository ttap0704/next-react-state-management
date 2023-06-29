import {cookies} from "next/dist/client/components/headers";
import {NextRequest, NextResponse} from "next/server";
import {verify} from "../jwt";

export async function GET(request: NextRequest) {
  const token = cookies().get("access_token");
  let pass = false,
    message = "",
    data: null | UserClient = null;

  if (token) {
    try {
      const verify_res = await verify(token.value);
      if (verify_res) {
        pass = true;
        data = {...JSON.parse(verify_res.payload as string)} as UserClient;
      }
    } catch (err) {
      console.log(err);
    }
  }

  const res: ApiResponseDefault = {pass, message, data};

  return NextResponse.json(res);
}

export async function POST(request: NextRequest) {
  const data = request.json();

  return data;
}
