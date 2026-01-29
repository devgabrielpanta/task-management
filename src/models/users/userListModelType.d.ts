import type { User } from "@models/users";

export interface IUserListActions {
    // ###########################################################
    //                  GET USERS METHODS
    // ###########################################################

    getUserById(userId: string): User | undefined;
    getAllUsers(): User[];
    getActiveUsers(): User[];
    getInactiveUsers(): User[];
    queryUser(query: unknown): User[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    addUser(params: ICreateUser): void;
    removeUser(userId: string): void;
    updateUser(userId: string, updatedUser: TUpdateUser): void;
    toggleActive(userId: string): void;

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################

    setAsAdmin(userId: string): void;
    setAsManager(userId: string): void;
    setAsMember(userId: string): void;
    setAsViewer(userId: string): void;
}