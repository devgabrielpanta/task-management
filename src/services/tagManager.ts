import type { Task } from "@models/tasks";

export class TagManager {
    private tags: Map<string, Task[]> = new Map();

    addTag(item: Task, tag: string): void {
        if (!this.tags.has(tag)) {
            this.tags.set(tag, [item]);
        } else {
            this.tags.get(tag)?.push(item);
        }
    }

    removeTag(item: Task, tag: string): void {
        if (this.tags.has(tag)) {
            const items = this.tags.get(tag);
            if (items) {
                this.tags.set(tag, items.filter(i => i.getId() !== item.getId()));
                if (this.tags.get(tag)?.length === 0) {
                    this.tags.delete(tag);
                }
            }
        }
    }

    getTags(): string[] {
        return Array.from(this.tags.keys());
    }
}