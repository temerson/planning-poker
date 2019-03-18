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

router.route('/.well-known/acme-challenge/b05fe7588a112ed2d0d0da28150684c9').get((req, res) => {
  res.send('b05fe7588a112ed2d0d0da28150684c9.zYZWbDQJDEDNxRwYj5o9Qj9em3QpqDrnZeAUcQPSGfU');
});

export default router;
