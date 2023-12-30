export interface IUserService {
    createUser(userData: any): Promise<any>;
    getUserById(userId: number): Promise<any>;
    changeUserBalance(userId: number, decreasedBalance: number): Promise<any>;
  }