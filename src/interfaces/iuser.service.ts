export interface IUserService {
    createUser(userData: any): Promise<any>;
    getUserById(userId: number): Promise<any>;
  }