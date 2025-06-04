import { UserModel } from "./UserModel.1";



export interface AuthResponse {
  token: string;
  user: UserModel;


}
