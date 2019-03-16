import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';
const router = new Router();

router.route('/boards/').get(BoardController.getBoards);
router.route('/boards/').post(BoardController.addBoard);
router.route('/boards/:boardId').get(BoardController.getBoard);
router.route('/boards/:boardId').delete(BoardController.deleteBoard);

router.route('/boards/:boardId/users/').get(BoardController.getUsersOnBoard);
router.route('/boards/:boardId/users/').post(BoardController.addUserToBoard);
router.route('/boards/:boardId/users/:userId').post(BoardController.removeUserFromBoard);

export default router;
