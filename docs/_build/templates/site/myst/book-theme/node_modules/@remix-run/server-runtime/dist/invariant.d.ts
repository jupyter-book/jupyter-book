export default function invariant(value: boolean, message?: string): asserts value;
export default function invariant<T>(value: T | null | undefined, message?: string): asserts value is T;
