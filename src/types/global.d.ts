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
  pass: boolean;
};

type CreateTodoRequest = {
  user_id: number;
  contents: string;
};

type Todo = {
  id: number;
  user_id: number;
  contents: string;
  todo: number;
  created_at: string;
};
