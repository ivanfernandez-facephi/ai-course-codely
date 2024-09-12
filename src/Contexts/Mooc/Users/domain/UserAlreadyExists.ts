export class UserAlreadyExists extends Error {
	constructor(id: string) {
		super(`User with ${id} already exists`);
	}
}
