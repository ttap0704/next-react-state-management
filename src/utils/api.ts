import {NextResponse} from "next/server";
import {SERVER_NAME} from "../../constants";

export async function fetchGetApi(url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();

  return NextResponse.json(data);
}

export async function fetchPostApi(body: object, url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({time: new Date().toISOString(), data: body}),
  });

  const data = await res.json();

  return NextResponse.json(data);
}
