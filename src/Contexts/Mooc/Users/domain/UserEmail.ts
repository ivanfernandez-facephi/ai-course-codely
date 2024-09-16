import InvalidArgumentError from '../../../Shared/domain/InvalidArgumentError';
import RequiredStringValueObject from '../../../Shared/domain/RequiredStringValueObject';

export class UserEmail extends RequiredStringValueObject {
	constructor(value: string) {
		UserEmail.ensureIsValidEmail(value);

		super(value);
	}

	private static ensureIsValidEmail(value: string): void {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!regex.test(value)) {
			throw new InvalidArgumentError(`Invalid email: "${value}"`);
		}
	}
}
