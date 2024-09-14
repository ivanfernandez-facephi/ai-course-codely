import { User } from '../domain/User';
import { UserFinderDomainService } from '../domain/UserFinderDomainService';

export class UserFinder {
	constructor(private readonly finderDomainService: UserFinderDomainService) {}

	async run(id: string): Promise<User> {
		return this.finderDomainService.run(id);
	}
}
