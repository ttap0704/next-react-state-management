type ApiResponseDefault = {
  pass: boolean;
  message: string;
  data: any | any[] | object;
};

type ApiRequestBody = {
  time: string;
  data: any;
};

type UserModel = {
  id: number;
  login_id: string;
  password: string;
  created_at: string;
};

type UserClient = {
  id: number;
  login_id: string;
  created_at: string;
};

type CreateTodoRequest = {
  user_id: number;
  contents: string;
};

type UpdateTodoRequest = {
  contents?: string;
  todo?: number;
};

type TodoModel = {
  id: number;
  user_id: number;
  contents: string;
  todo: number;
  created_at: string;
};
