import {SERVER_NAME} from "../../constants";

async function fetchGetApi(url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: ApiResponseDefault = await res.json();
  if (data.message) {
    alert(data.message);
  }

  return data.data;
}

async function fetchPostApi(body: object, url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({time: new Date().toISOString(), data: body}),
  });

  const data: ApiResponseDefault = await res.json();
  if (data.message) {
    alert(data.message);
  }

  return data.data;
}

async function fetchPutApi(body: object, url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({time: new Date().toISOString(), data: body}),
  });

  const data: ApiResponseDefault = await res.json();
  if (data.message) {
    alert(data.message);
  }

  return data.data;
}

async function fetchDeleteApi(url: string) {
  const res = await fetch(`${SERVER_NAME}/api${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data: ApiResponseDefault = await res.json();
  if (data.message) {
    alert(data.message);
  }

  return data.data;
}

export async function fetchLoginApi(body: object) {
  const res: UserClient = await fetchPostApi(body, "/users/login");
  return res;
}

export async function fetchLogoutApi() {
  const res: boolean = await fetchPostApi({}, "/users/logout");
  return res;
}

export async function fetchJoinApi(body: object) {
  const res: boolean = await fetchPostApi(body, "/users/join");
  return res;
}

export async function fetchGetUserInfoApi() {
  const res: UserClient = await fetchGetApi("/users");
  return res;
}

export async function fetchGetTodosApi(user_id: number) {
  const res: TodoModel[] = await fetchGetApi(`/todos?user_id=${user_id}`);
  return res;
}

export async function fecthTodoApi(body: CreateTodoRequest) {
  const res: boolean = await fetchPostApi(body, "/todos");
  return res;
}

export async function fetchUpdateTodoApi(body: {data: UpdateTodoRequest; id: number}) {
  const res: TodoModel | undefined = await fetchPutApi(body.data, `/todos/${body.id}`);
  return res;
}

export async function fecthDeleteTodoApi(id: number) {
  const res: TodoModel | undefined = await fetchDeleteApi(`/todos/${id}`);
  return res;
}
