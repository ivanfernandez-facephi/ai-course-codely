export class CourseAlreadyExists extends Error {
	constructor(id: string) {
		super(`Course with ${id} already exists`);
	}
}
