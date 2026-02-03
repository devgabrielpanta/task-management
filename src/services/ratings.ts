type TRating = 1 | 2 | 3 | 4 | 5;

export class RatingSystem<T> {
    private ratings: Map<T, TRating[]> = new Map();

    rate(item: T, value: TRating): void {
        if (!this.ratings.has(item)) {
            this.ratings.set(item, []);
        }
        this.ratings.get(item)!.push(value);
    }

    getAverage(item: T): TRating | null {
        const itemRatings = this.ratings.get(item);
        if (!itemRatings || itemRatings.length === 0) {
            return null;
        }
        const total = itemRatings.reduce((acc, rating) => acc + rating, 0);
        return Math.round(total / itemRatings.length) as TRating;
    }

    getRatings(item: T): TRating[] {
        return this.ratings.get(item) || [];
    }
}
