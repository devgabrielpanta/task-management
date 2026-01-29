import type { IUser, IUserBase, TUpdateUser } from "@models/users";
import { UserRole } from "utils";
import type { TUserRole } from "utils";

export class User implements IUser {
    public id: string;
    public createdAt: Date;
    public updatedAt: Date;
    private name: string;
    private email: string;
    private role: TUserRole;
    private active: boolean = true;

    constructor(params: { name: string; email: string; role: TUserRole }) {
        this.id = new Date().getTime().toString();
        this.name = params.name;
        this.email = params.email;
        this.role = params.role;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
    // ###########################################################
    //                  CRUD METHODS
    // ###########################################################
    public getUser(): IUserBase {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
            active: this.active,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }

    public updateUser(updatedUser: TUpdateUser): void {
        for (const key in updatedUser) {
            (this as any)[key] = (updatedUser as any)[key];
        }
        this.updatedAt = new Date();
    }

    public handleQuery(query: unknown): boolean {
        if (UserRole[query as keyof typeof UserRole]) {
            return this.queryByRole(query as keyof typeof UserRole);
        }

        return this.queryByName(String(query)) || this.queryByEmail(String(query));
    }

    // ###########################################################
    //                  QUERY HELPERS
    // ###########################################################

    private queryByName(query: string): boolean {
        return this.name.includes(query);
    }

    private queryByEmail(query: string): boolean {
        return this.email.includes(query);
    }

    private queryByRole(query: TUserRole): boolean {
        return this.role === UserRole[query];
    }

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################

    isActive(): boolean {
        return this.active;
    }

    toggleActive() {
        this.active = !this.active;
        this.updatedAt = new Date();
    }

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################

    getRole(): TUserRole {
        return this.role;
    }

    setRole(newRole: TUserRole): void {
        this.role = newRole;
        this.updatedAt = new Date();
    }

}