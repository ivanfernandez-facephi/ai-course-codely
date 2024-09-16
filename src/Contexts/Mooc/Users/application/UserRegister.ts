import { EventBus } from '../../../Shared/domain/eventBus/EventBus';
import { User } from '../domain/User';
import { UserAlreadyExists } from '../domain/UserAlreadyExists';
import { UserEmail } from '../domain/UserEmail';
import { UserId } from '../domain/UserId';
import { UserName } from '../domain/UserName';
import { UserRepository } from '../domain/UserRepository';

export class UserRegister {
	constructor(private readonly repository: UserRepository, private readonly eventBus: EventBus) {}

	async run(id: string, name: string, email: string): Promise<void> {
		await this.ensureUserDoesNotExist(id);

		const user = User.register({
			id: new UserId(id),
			name: new UserName(name),
			email: new UserEmail(email)
		});

		await this.repository.persist(user);

		return this.eventBus.publish(user.pullDomainEvents());
	}

	private async ensureUserDoesNotExist(id: string): Promise<void> {
		const user = await this.repository.findById(new UserId(id));

		if (user) {
			throw new UserAlreadyExists(id);
		}
	}
}
