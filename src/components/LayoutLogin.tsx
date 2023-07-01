"use client";

import useLoginMutation from "@/queries/useLoginMutation";
import useUsersQuery from "@/queries/useUsersQuery";
import {fetchJoinApi} from "@/utils/api";
import Link from "next/link";
import {useRouter} from "next/navigation";
import React, {useEffect, useRef, useState} from "react";

export default function LayoutLogin() {
  const router = useRouter();
  const [join, setJoin] = useState(false);

  const input_login_id = useRef<null | HTMLInputElement>(null);
  const input_password = useRef<null | HTMLInputElement>(null);
  const input_password_check = useRef<null | HTMLInputElement>(null);

  const {data: user} = useUsersQuery();
  const {mutate: loginUser} = useLoginMutation();

  useEffect(() => {
    setJoin(location.pathname == "/join");
  }, []);

  useEffect(() => {
    if (!join && user?.id) {
      router.push("/todos");
    }
  }, [user]);

  const formHandler = async () => {
    if (join) {
      if (!input_login_id.current || !input_password.current || !input_password_check.current) return;
      if (input_login_id.current.value.length < 6) {
        alert("아이디는 6자 이상으로 설정해주세요.");
        return;
      }
      if (input_password.current.value != input_password_check.current.value) {
        alert("비밀번호가 맞지 않습니다.");
        return;
      }
      if (input_password.current.value.length < 8) {
        alert("비밀번호는 8자 이상으로 설정해주세요.");
        return;
      }
      const join_res = await fetchJoinApi({
        login_id: input_login_id.current.value,
        login_password: input_password.current.value,
      });
      if (join_res) {
        router.push("/login");
      }
    } else {
      if (!input_login_id.current || !input_password.current) return;
      await loginUser({login_id: input_login_id.current.value, login_password: input_password.current.value});
    }
  };

  return (
    <div id="login-wrapper" className="main-contents">
      <input
        id="input-login-id"
        className="login-input"
        ref={input_login_id}
        type="text"
        placeholder="아이디를 입력해주세요."
      />
      <input
        id="input-login-password"
        className="login-input"
        ref={input_password}
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      {join ? (
        <input
          id="input-login-password-check"
          className="login-input"
          ref={input_password_check}
          type="password"
          placeholder="비밀번호를 다시 입력해주세요."
        />
      ) : null}

      <button id="login-button" onClick={formHandler}>
        {join ? "회원가입" : "로그인"}
      </button>
      <Link href={join ? "/login" : "/join"}>{join ? "로그인하러 가기" : "회원가입하러 가기"}</Link>
    </div>
  );
}
