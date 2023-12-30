export interface IUserService {
    createUser(userData: any): Promise<any>;
    getUserById(userId: number): Promise<any>;
    decreaseUserBalance(userId: number, decreasedBalance: number): Promise<any>;
    increaseUserBalance(userId: number, decreasedBalance: number): Promise<any>;
  }