import type { IBaseListActions } from "types/globals";
import type { User } from "@models/users";

export interface IUserListActions extends IBaseListActions<User> {
    // ###########################################################
    //                  GET USERS METHODS
    // ###########################################################

    getActiveUsers(): User[];
    getInactiveUsers(): User[];
    queryUser(query: unknown): User[];

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    toggleActive(userId: string): void;

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################

    setAsAdmin(userId: string): void;
    setAsManager(userId: string): void;
    setAsMember(userId: string): void;
    setAsViewer(userId: string): void;
}