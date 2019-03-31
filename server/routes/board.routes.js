import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';
const router = new Router();

router.route('/').get(BoardController.getBoards);
router.route('/').post(BoardController.addBoard);
router.route('/:boardId').delete(BoardController.deleteBoard);

router.route('/:boardSlug/users').get(BoardController.getUsersOnBoard);
router.route('/:boardId/users').post(BoardController.addUserToBoard);
router.route('/:boardId/users/:userId').post(BoardController.removeUserFromBoard);

router.route('/:boardSlug/tasks').put(BoardController.changeActiveTask);

export default router;
