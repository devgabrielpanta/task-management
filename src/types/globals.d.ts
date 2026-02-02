export type TId = string;

export interface IBaseEntity {
    id: TId;
    createdAt: Date;
    updatedAt: Date;
}

export interface IBaseModelActions {
    get(): object;
    getId(): TId;
    update(updated: Partial<this>): void;
}

export interface IBaseListActions<T> {
    getAll(): T[];
    getById(id: TId): T | undefined;
    add(item: T): void;
    update(id: TId, updatedItem: Partial<T>): void;
    delete(id: TId): void;
}