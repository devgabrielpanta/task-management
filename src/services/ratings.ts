import type { TId } from "types/globals";
import { Task } from "@models/tasks";


export class RatingSystem {
    private ratings: Map<TId, number[]> = new Map();

    rate(item: Task, value: number): void {
        if (!this.ratings.has(item.getId())) {
            this.ratings.set(item.getId(), []);
        }
        this.ratings.get(item.getId())!.push(value);
    }

    getAverage(item: Task): number {
        const itemRatings = this.ratings.get(item.getId());
        if (!itemRatings || itemRatings.length === 0) {
            return 0;
        }
        const total = itemRatings.reduce((sum, rating) => sum + rating, 0);
        return total / itemRatings.length;
    }

    getRatings(item: Task): number[] {
        return this.ratings.get(item.getId()) || [];
    }
}
