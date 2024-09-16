import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { UserEmail } from './UserEmail';
import { UserFinishedCourses } from './UserFinishedCourses';
import { UserId } from './UserId';
import { UserName } from './UserName';
import { UserSuggestedCourses } from './UserSuggestedCourses';

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	suggestedCourses: string[];
	finishedCourses: string[];
};

export class User extends AggregateRoot {
	readonly id: UserId;

	readonly name: UserName;

	readonly email: UserEmail;

	private readonly _suggestedCourses: UserSuggestedCourses;

	private readonly _finishedCourses: UserFinishedCourses;

	public get suggestedCourses(): UserSuggestedCourses {
		return new UserSuggestedCourses(this._suggestedCourses.items);
	}

	public get finishedCourses(): UserFinishedCourses {
		return new UserFinishedCourses(this._finishedCourses.items);
	}

	constructor({
		id,
		name,
		email,
		suggestedCourses,
		finishedCourses
	}: {
		id: UserId;
		name: UserName;
		email: UserEmail;
		suggestedCourses: UserSuggestedCourses;
		finishedCourses: UserFinishedCourses;
	}) {
		super();

		this.id = id;
		this.name = name;
		this.email = email;
		this._suggestedCourses = suggestedCourses;
		this._finishedCourses = finishedCourses;
	}

	static register({ id, name, email }: { id: UserId; name: UserName; email: UserEmail }): User {
		const user = new User({
			id,
			name,
			email,
			suggestedCourses: UserSuggestedCourses.empty(),
			finishedCourses: UserFinishedCourses.empty()
		});

		user.record(
			new UserCreatedDomainEvent({
				aggregateId: user.id.value,
				name: user.name.value,
				email: user.email.value
			})
		);

		return user;
	}

	static fromPrimitives(plainData: UserPrimitives): User {
		return new User({
			id: new UserId(plainData.id),
			name: new UserName(plainData.name),
			email: new UserEmail(plainData.email),
			suggestedCourses: new UserSuggestedCourses(plainData.suggestedCourses),
			finishedCourses: new UserFinishedCourses(plainData.finishedCourses)
		});
	}

	toPrimitives(): UserPrimitives {
		return {
			id: this.id.value,
			name: this.name.value,
			email: this.email.value,
			suggestedCourses: this.suggestedCourses.items,
			finishedCourses: this.finishedCourses.items
		};
	}

	updateFinishedCourses(courseName: string): User {
		const user = User.fromPrimitives({
			...this.toPrimitives(),
			finishedCourses: this._finishedCourses.add(courseName).items
		});

		return user;
	}

	updateSuggestedCourses(newCourseNames: string[]): User {
		const user = User.fromPrimitives({
			...this.toPrimitives(),
			suggestedCourses: this._suggestedCourses.add(...newCourseNames).items
		});

		return user;
	}
}
