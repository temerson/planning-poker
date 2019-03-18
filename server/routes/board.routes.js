import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';
const router = new Router();

router.route('/').get(BoardController.getBoards);
router.route('/').post(BoardController.addBoard);
router.route('/:boardId').delete(BoardController.deleteBoard);

router.route('/:boardSlug/users').get(BoardController.getUsersOnBoard);
router.route('/:boardSlug/users').post(BoardController.addUserToBoard);
router.route('/:boardSlug/users/:username').post(BoardController.removeUserFromBoard);

export default router;
