import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	suggestedCourses: string[];
};

export class User extends AggregateRoot {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	private readonly _suggestedCourses: string[];

	public get suggestedCourses(): string[] {
		return [...this._suggestedCourses];
	}

	constructor({
		id,
		name,
		email,
		suggestedCourses
	}: {
		id: string;
		name: string;
		email: string;
		suggestedCourses: string[];
	}) {
		super();

		this.id = id;
		this.name = name;
		this.email = email;
		this._suggestedCourses = suggestedCourses;
	}

	static register({ id, name, email }: { id: string; name: string; email: string }): User {
		const user = new User({ id, name, email, suggestedCourses: [] });

		user.record(
			new UserCreatedDomainEvent({
				aggregateId: user.id,
				name: user.name,
				email: user.email,
				suggestedCourses: user.suggestedCourses
			})
		);

		return user;
	}

	static fromPrimitives(plainData: UserPrimitives): User {
		return new User({
			...plainData
		});
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			suggestedCourses: [...this.suggestedCourses]
		};
	}
}
