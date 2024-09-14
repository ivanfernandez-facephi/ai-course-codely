export interface UserSuggestedCourseGeneratorDomainService {
	run(finishedCourses: string[]): Promise<string[]>;
}
