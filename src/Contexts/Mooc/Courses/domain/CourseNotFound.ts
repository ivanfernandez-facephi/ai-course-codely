export class CourseNotFound extends Error {
	constructor(id: string) {
		super(`Course with id ${id} not found.`);
	}
}
