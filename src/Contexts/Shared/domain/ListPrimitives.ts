export class ListPrimitives<T> {
	private readonly _items: T[];

	public get items(): T[] {
		return [...this._items];
	}

	constructor(items?: T[]) {
		this._items = items?.length ? [...items] : [];
	}

	static empty<T>(): ListPrimitives<T> {
		return new ListPrimitives<T>();
	}

	public add(...item: T[]): ListPrimitives<T> {
		return new ListPrimitives<T>([...this._items, ...item]);
	}

	public remove(item: T): ListPrimitives<T> {
		return new ListPrimitives<T>(this._items.filter(i => i !== item));
	}
}
