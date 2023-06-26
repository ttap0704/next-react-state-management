type ApiResponse = {
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
