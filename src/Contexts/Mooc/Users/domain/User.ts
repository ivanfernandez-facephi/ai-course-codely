import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';

export type UserPrimitives = {
	id: string;
	name: string;
	email: string;
	suggestedCourses: string[];
	finishedCourses: string[];
};

export class User extends AggregateRoot {
	readonly id: string;

	readonly name: string;

	readonly email: string;

	private readonly _suggestedCourses: string[];

	private readonly _finishedCourses: string[];

	public get suggestedCourses(): string[] {
		return [...this._suggestedCourses];
	}

	public get finishedCourses(): string[] {
		return [...this._finishedCourses];
	}

	constructor({
		id,
		name,
		email,
		suggestedCourses,
		finishedCourses
	}: {
		id: string;
		name: string;
		email: string;
		suggestedCourses: string[];
		finishedCourses: string[];
	}) {
		super();

		this.id = id;
		this.name = name;
		this.email = email;
		this._suggestedCourses = suggestedCourses;
		this._finishedCourses = finishedCourses;
	}

	static register({ id, name, email }: { id: string; name: string; email: string }): User {
		const user = new User({ id, name, email, suggestedCourses: [], finishedCourses: [] });

		user.record(
			new UserCreatedDomainEvent({
				aggregateId: user.id,
				name: user.name,
				email: user.email
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
			suggestedCourses: this.suggestedCourses,
			finishedCourses: this.finishedCourses
		};
	}

	updateFinishedCourses(courseName: string): User {
		const user = new User({
			...this.toPrimitives(),
			finishedCourses: [...this.finishedCourses, courseName]
		});

		return user;
	}

	updateSuggestedCourses(newCourseNames: string[]): User {
		const user = new User({
			...this.toPrimitives(),
			suggestedCourses: [...this.suggestedCourses, ...newCourseNames]
		});

		return user;
	}
}
