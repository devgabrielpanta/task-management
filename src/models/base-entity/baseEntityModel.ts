import type { TId, IBaseModelActions } from "types/globals";

export class IDGenerator {
    protected static totalEntities: number = 0;

    static generateID(): TId {
        const id = new Date().getTime().toString();
        this.totalEntities++
        return String(id + this.totalEntities.toString());
    }
}

export abstract class BaseEntity implements IBaseModelActions {
    protected id: TId;
    protected createdAt: Date;
    protected updatedAt: Date;

    constructor() {
        this.id = IDGenerator.generateID();
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    get(): object {
        const data = {}
        for (const key in this) {
            if (this.hasOwnProperty(key) && typeof (this as any)[key] !== 'function') {
                (data as any)[key] = (this as any)[key];
            }
        }
        return data;
    }

    getId(): TId {
        return this.id;
    }

    update(updated: Partial<this>): void {
        for (const key in updated) {
            if (updated.hasOwnProperty(key) && (this as any).hasOwnProperty(key)) {
                (this as any)[key] = (updated as any)[key];
            }
        }
        this.updatedAt = new Date();
    }
}