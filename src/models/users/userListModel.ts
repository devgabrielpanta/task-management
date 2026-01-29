import type { ICreateUser, TUpdateUser } from "@models/users";
import { User } from "@models/users";
import { UserRole } from "utils";

export class UserList {
    private users: User[] = [];

    // ###########################################################
    //                  GET USERS METHODS
    // ###########################################################

    public getUserById(userId: string): User | undefined {
        return this.users.find(user => user.id === userId);
    }

    public getAllUsers(): User[] {
        return this.users;
    }

    public getActiveUsers(): User[] {
        return this.users.filter(user => user.isActive());
    }

    public getInactiveUsers(): User[] {
        return this.users.filter(user => !user.isActive());
    }

    public queryUser(query: unknown): User[] {
        return this.users.filter(user => user.handleQuery(query));
    }

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    public addUser(params: ICreateUser): void {
        const user = new User(params);
        this.users.push(user);
    }

    public removeUser(userId: string): void {
        this.users = this.users.filter(user => user.id !== userId);
    }

    public updateUser(userId: string, updatedUser: TUpdateUser): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.updateUser(updatedUser);
        }
    }

    public toggleActive(userId: string): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.toggleActive();
        }
    }

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################

    public setAsAdmin(userId: string): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.setRole(UserRole.ADMIN);
        }
    }

    public setAsManager(userId: string): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.setRole(UserRole.MANAGER);
        }
    }

    public setAsMember(userId: string): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.setRole(UserRole.MEMBER);
        }
    }

    public setAsViewer(userId: string): void {
        const user = this.users.find(user => user.id === userId);
        if (user) {
            user.setRole(UserRole.VIEWER);
        }
    }
}