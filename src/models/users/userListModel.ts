import { EntityList } from "@models/base-entity";
import { User } from "@models/users";
import { UserRole } from "utils";

export class UserList extends EntityList<User> {
    // ###########################################################
    //                  GET USERS METHODS
    // ###########################################################

    public getActiveUsers(): User[] {
        return this.getAll().filter(user => user.isActive());
    }

    public getInactiveUsers(): User[] {
        return this.getAll().filter(user => !user.isActive());
    }

    public queryUser(query: unknown): User[] {
        return this.getAll().filter(user => user.handleQuery(query));
    }

    // ###########################################################
    //                CREATE, UPDATE, DELETE METHODS
    // ###########################################################

    public toggleActive(userId: string): void {
        const user = this.getById(userId);
        if (user) {
            user.toggleActive();
        }
    }

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################

    public setAsAdmin(userId: string): void {
        const user = this.getById(userId);
        if (user) {
            user.setRole(UserRole.ADMIN);
        }
    }

    public setAsManager(userId: string): void {
        const user = this.getById(userId);
        if (user) {
            user.setRole(UserRole.MANAGER);
        }
    }

    public setAsMember(userId: string): void {
        const user = this.getById(userId);
        if (user) {
            user.setRole(UserRole.MEMBER);
        }
    }

    public setAsViewer(userId: string): void {
        const user = this.getById(userId);
        if (user) {
            user.setRole(UserRole.VIEWER);
        }
    }
}