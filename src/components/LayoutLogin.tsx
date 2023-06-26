"use client";

import useJoinMutation from "@/queries/useJoinMutation";
import useLoginMutation from "@/queries/useLoginMutation";
import useUsersQuery from "@/queries/useUsersQuery";
import {fetchGetApi} from "@/utils/api";
import Link from "next/link";
import React, {useEffect, useState} from "react";

export default function LayoutLogin() {
  const [join, setJoin] = useState(false);
  const [logindId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginPasswordCheck, setLoginPasswordCheck] = useState("");
  const loginMutation = useLoginMutation({login_id: logindId, login_password: loginPassword});
  const joinMutation = useJoinMutation({login_id: logindId, login_password: loginPassword});

  useEffect(() => {
    setJoin(location.pathname == "/join");
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == "input-login-password") setLoginPassword(e.target.value);
    else if (e.target.id == "input-login-id") setLoginId(e.target.value);
    else setLoginPasswordCheck(e.target.value);
  };

  const formHandler = async () => {
    if (join) {
      if (logindId.length < 6) {
        alert("아이디는 6자 이상으로 설정해주세요.");
        return;
      }
      if (loginPassword != loginPasswordCheck) {
        alert("비밀번호가 맞지 않습니다.");
        return;
      }
      if (loginPassword.length < 8) {
        alert("비밀번호는 8자 이상으로 설정해주세요.");
        return;
      }

      joinMutation.mutate({login_id: logindId, login_password: loginPassword});
    } else {
      loginMutation.mutate({login_id: logindId, login_password: loginPassword});
    }
  };

  return (
    <div id="login-wrapper">
      <input
        id="input-login-id"
        className="login-input"
        value={logindId}
        type="text"
        onChange={handleInput}
        placeholder="아이디를 입력해주세요."
      />
      <input
        id="input-login-password"
        className="login-input"
        value={loginPassword}
        type="password"
        onChange={handleInput}
        placeholder="비밀번호를 입력해주세요."
      />
      {join ? (
        <input
          id="input-login-password-check"
          className="login-input"
          value={loginPasswordCheck}
          type="password"
          onChange={handleInput}
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
