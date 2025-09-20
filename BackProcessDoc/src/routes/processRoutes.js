const express = require('express');
const router = express.Router();
const processController = require('../controllers/processController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', processController.listarProcessos);
router.get('/:id', processController.pegarProcessoPorId);
router.post('/', processController.criarProcesso);
router.put('/:id', processController.atualizarProcesso);
router.delete('/:id', processController.deletarProcesso);

module.exports = router;
