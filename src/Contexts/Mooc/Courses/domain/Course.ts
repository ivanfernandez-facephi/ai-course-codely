import { AggregateRoot } from '../../../Shared/domain/AggregateRoot';
import { CourseCreatedDomainEvent } from './CourseCreatedDomainEvent';

export type CoursePrimitives = {
	id: string;
	name: string;
	duration: string;
};

export class Course extends AggregateRoot {
	readonly id: string;
	readonly name: string;
	readonly duration: string;

	constructor({ id, name, duration }: { id: string; name: string; duration: string }) {
		super();

		this.id = id;
		this.name = name;
		this.duration = duration;
	}

	static create({ id, name, duration }: { id: string; name: string; duration: string }): Course {
		const course = new Course({ id, name, duration });

		course.record(new CourseCreatedDomainEvent({ aggregateId: course.id, name: course.name }));

		return course;
	}

	toPrimitives(): CoursePrimitives {
		return { id: this.id, name: this.name, duration: this.duration };
	}
}
