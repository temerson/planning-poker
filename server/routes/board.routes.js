import { Router } from 'express';
import * as BoardController from '../controllers/board.controller';
const router = new Router();

router.route('/boards').get(BoardController.getBoards);
router.route('/boards').post(BoardController.addBoard);
router.route('/boards/:boardSlug').get(BoardController.getBoard);
router.route('/boards/:boardSlug').delete(BoardController.deleteBoard);

router.route('/boards/:boardSlug/users').get(BoardController.getUsersOnBoard);
router.route('/boards/:boardSlug/users').post(BoardController.addUserToBoard);
router.route('/boards/:boardSlug/users/:username').post(BoardController.removeUserFromBoard);

export default router;
