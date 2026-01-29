import type { TId, IBaseEntity } from "types/globals";
import type { TUserRole } from "utils";

export interface ICreateUser {
    name: string;
    email: string;
    role: TUserRole;
}

export interface IUserBase extends ICreateUser, IBaseEntity {
    active: boolean;
}

export type TUpdateUser = Omit<Partial<IUserBase>, 'id' | 'createdAt' | 'updatedAt'>;

export interface IUserActions {
    // ###########################################################
    //                  CRUD METHODS
    // ###########################################################
    getUser(): IUserBase;
    updateUser(updatedUser: TUpdateUser): void;
    handleQuery(query: unknown): boolean;

    // ###########################################################
    //                  STATUS METHODS
    // ###########################################################
    isActive(): boolean;
    toggleActive(): void;

    // ###########################################################
    //                  ROLE METHODS
    // ###########################################################
    getRole(): TUserRole;
    setRole(newRole: TUserRole): void;
}

export interface IUser implements IBaseEntity, IUserActions { }