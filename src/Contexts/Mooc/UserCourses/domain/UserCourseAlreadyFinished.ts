export class UserCourseAlreadyFinished extends Error {
	constructor({ id, courseName }: { id: string; courseName: string }) {
		super(`User ${id} Course ${courseName} has already been finished.`);
	}
}
