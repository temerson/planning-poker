import { Router } from 'express';
import * as BoardController from './controllers/board.controller';
const router = new Router();

router.route('/').get(BoardController.getBoards);
router.route('/').post(BoardController.addBoard);
router.route('/:boardId').delete(BoardController.deleteBoard);

export default router;
