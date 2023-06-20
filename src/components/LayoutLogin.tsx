"use client";

import useUsersLoginMudation from "@/queries/useUsersLoginMutation";
import {fetchPostApi} from "@/utils/api";
import {useMutation} from "@tanstack/react-query";
import React, {useState} from "react";

export default function LayoutLogin() {
  const [logindId, setLoginId] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const {mutate} = useUsersLoginMudation({login_id: logindId, login_password: loginPassword});

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == "input-login-password") setLoginPassword(e.target.value);
    else if (e.target.id == "input-login-id") setLoginId(e.target.value);
  };

  const loginUser = async () => {
    mutate({login_id: logindId, login_password: loginPassword});
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
      <button id="login-button" onClick={loginUser}>
        LOGIN
      </button>
    </div>
  );
}
