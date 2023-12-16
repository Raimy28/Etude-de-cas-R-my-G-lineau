// api/articles/articles.router.js
const express = require('express');
const router = express.Router();
const articlesController = require('./articles.controller');
const authMiddleware = require('../../middlewares/auth');

router.get('/', articlesController.getAll);
router.get('/:articleId', articlesController.get);

// Middleware d'authentification modifié pour ajouter les informations de l'utilisateur dans 'req'
router.use(authMiddleware);

router.post('/', articlesController.create);
router.put('/:articleId', authMiddleware.isAdmin, articlesController.update);
router.delete('/:articleId', authMiddleware.isAdmin, articlesController.delete);

module.exports = router;
