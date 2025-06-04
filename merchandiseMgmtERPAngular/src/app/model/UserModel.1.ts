
export class UserModel {
  id!: string;
  name!: string;
  email!: string;
  password!: string;
  cell!:string;
  dob!:Date;
  gender!:string;
  address!:string;
  image!: string;
  role!: string;
}


export enum role {
  
  ADMIN = 'ADMIN',
  USER = 'USER',
  
}
