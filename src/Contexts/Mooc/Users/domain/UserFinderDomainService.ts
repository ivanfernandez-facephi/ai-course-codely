import { User } from './User';
import { UserNotFound } from './UserNotFound';
import { UserRepository } from './UserRepository';

export class UserFinderDomainService {
	constructor(private readonly repository: UserRepository) {}

	async run(id: string): Promise<User> {
		const user = await this.repository.findById(id);

		if (!user) {
			throw new UserNotFound(id);
		}

		return user;
	}
}
