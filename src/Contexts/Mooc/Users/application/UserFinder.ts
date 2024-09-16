import { User } from '../domain/User';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';
import { UserId } from '../domain/UserId';

export class UserFinder {
	constructor(private readonly finderDomainService: UserFinderDomainService) {}

	async run(id: string): Promise<User> {
		return this.finderDomainService.run(new UserId(id));
	}
}
