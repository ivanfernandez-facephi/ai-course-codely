import { User } from '../domain/User';
import { UserNotFound } from '../domain/UserNotFound';
import { UserRepository } from '../domain/UserRepository';

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	async run(id: string): Promise<User> {
		const user = await this.repository.findById(id);

		if (!user) {
			throw new UserNotFound(id);
		}

		return user;
	}
}
