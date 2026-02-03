import { UserRole } from "utils";
import type { TUserRole } from "utils";
import { BaseEntity } from "@models/base-entity";

export class User extends BaseEntity {
    private name: string;
    private email: string;
    private role: TUserRole;
    private active: boolean = true;

    constructor(params: { name: string; email: string; role: TUserRole }) {
        super();
        this.name = params.name;
        this.email = params.email;
        this.role = params.role;

    }
    // ###########################################################
    //                  CRUD METHODS
    // ###########################################################

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