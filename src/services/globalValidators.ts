export class GlobalValidators {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isNonEmptyString(value: string): boolean {
        return typeof value === 'string' && value.trim().length > 0;
    }

    static isPositiveNumber(value: number): boolean {
        return typeof value === 'number' && value > 0;
    }

}