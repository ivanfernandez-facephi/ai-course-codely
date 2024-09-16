import { User } from './User';
import { UserId } from './UserId';
import { UserNotFound } from './UserNotFound';
import { UserRepository } from './UserRepository';

export class UserFinderDomainService {
	constructor(private readonly repository: UserRepository) {}

	async run(id: UserId): Promise<User> {
		const user = await this.repository.findById(id);

		if (!user) {
			throw new UserNotFound(id.value);
		}

		return user;
	}
}
