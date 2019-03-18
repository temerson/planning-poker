import { Router } from 'express';
import * as TaskController from '../controllers/task.controller';
const router = new Router();

router.route('/').get(TaskController.getTasks);
router.route('/').post(TaskController.addTask);
router.route('/:taskId').delete(TaskController.deleteTask);

router.route('/:taskId/vote').post(TaskController.setUserVote);
router.route('/:taskId/vote/:voteId').delete(TaskController.deleteUserVote);

export default router;
