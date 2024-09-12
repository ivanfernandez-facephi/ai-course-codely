import { Request, Response, Router } from 'express';

import { CourseGetController } from '../controllers/CourseGetController';
import { CoursePutController } from '../controllers/CoursePutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const courseGetController = container.get<CourseGetController>(
		'Apps.mooc.controllers.CourseGetController'
	);
	router.get('/courses/:id', (req: Request, res: Response) => courseGetController.run(req, res));

	const coursePutController = container.get<CoursePutController>(
		'Apps.mooc.controllers.CoursePutController'
	);
	router.put('/courses/:id', (req: Request, res: Response) => coursePutController.run(req, res));
};
