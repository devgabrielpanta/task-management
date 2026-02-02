export class Favorites<T> {
    private items: T[] = [];

    add(item: T): void {
        if (typeof item !== "object" || item === null || !("id" in item)) return;
        this.items.filter(i => (i && typeof i === "object" && "id" in i ? i.id : undefined) !== item.id).push(item);
    }

    remove(item: T): void {
        if (typeof item !== "object" || item === null || !("id" in item)) return;
        this.items = this.items.filter(i => (i && typeof i === "object" && "id" in i ? i.id : undefined) !== item.id);
    }

    exists(item: T): boolean {
        if (typeof item !== "object" || item === null || !("id" in item)) return false;
        return this.items.some(i => (i && typeof i === "object" && "id" in i ? i.id : undefined) === item.id);
    }

    getAll(): T[] {
        return this.items;
    }
}