import type { IBaseListActions } from "types/globals";

export abstract class EntityList<T> implements IBaseListActions<T> {
    protected items: Map<string, T> = new Map();

    getAll(): T[] {
        return Array.from(this.items.values());
    }

    getById(id: string): T | undefined {
        return this.items.get(id);
    }

    add(item: T): void {
        const id = (item as any).id;
        this.items.set(id, item);
    }

    update(id: string, updatedItem: Partial<T>): void {
        const existingItem = this.items.get(id);
        if (existingItem) {
            if (typeof (existingItem as any).update === 'function') {
                (existingItem as any).update(updatedItem);
            }
        }
    }

    delete(id: string): void {
        this.items.delete(id);
    }

}