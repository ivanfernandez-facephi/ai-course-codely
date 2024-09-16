import { v4 as uuidv4, validate } from 'uuid';

export class UuidValueObject {
	readonly value: string;

	constructor(value: string) {
		UuidValueObject.ensureIsValidUuid(value);

		this.value = value;
	}

	static random(): UuidValueObject {
		return new UuidValueObject(uuidv4());
	}

	private static ensureIsValidUuid(value: string): void {
		const isValid = validate(value);

		if (!isValid) {
			throw new Error('Invalid UUID format');
		}
	}
}
