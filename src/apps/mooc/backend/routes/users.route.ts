import { Request, Response, Router } from 'express';

import { UserGetController } from '../controllers/UserGetController';
import { UserPutController } from '../controllers/UserPutController';
import container from '../dependency-injection';

export const register = (router: Router): void => {
	const userGetController = container.get<UserGetController>(
		'Apps.mooc.controllers.UserGetController'
	);
	router.get('/users/:id', (req: Request, res: Response) => userGetController.run(req, res));

	const userPutController = container.get<UserPutController>(
		'Apps.mooc.controllers.UserPutController'
	);
	router.put('/users/:id', (req: Request, res: Response) => userPutController.run(req, res));
};
