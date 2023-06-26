"use client";
import useUsersQuery from "@/queries/useUsersQuery";
import Image from "next/image";
import {useEffect} from "react";

export default function Home() {
  const {data} = useUsersQuery();

  useEffect(() => {
    console.log(data);
    if (data !== undefined) {
      console.log(data);
    }
  }, [data]);

  return <div>ho</div>;
}
