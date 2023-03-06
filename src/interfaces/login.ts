export interface ILoginRequest {
  email: string;
  password: string;
}

export interface IAxiosResponseLogin {
  data: IDataResponse;
}

interface IDataResponse {
  status: number;
  user: IUserDataResponse;
  token: string;
}

export interface IUserDataResponse {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  role: IUserRole;
}

interface IUserRole {
  id: number;
  name: string;
}
