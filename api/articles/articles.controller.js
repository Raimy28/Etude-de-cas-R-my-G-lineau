// api/articles/articles.controller.js
const articlesService = require('./articles.service');
const socket = require('../../socket');
const NotFoundError = require('../../errors/not-found');
const UnauthorizedError = require('../../errors/unauthorized');

class ArticlesController {
  async getAll(req, res, next) {
    try {
      const articles = await articlesService.getAll();
      res.json(articles);
    } catch (error) {
      next(error);
    }
  }

  async get(req, res, next) {
    try {
      const articleId = req.params.articleId;
      const article = await articlesService.get(articleId);

      if (!article) {
        throw new NotFoundError();
      }

      res.json(article);
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const userId = req.user._id;
      const article = await articlesService.create(userId, req.body);

      socket.getIO().emit('articles', { action: 'create', article });

      res.status(201).json(article);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
        const articleId = req.params.articleId;
  
        // Vérification si l'utilisateur est administrateur
        if (req.user.role !== 'admin') {
          throw new UnauthorizedError('Seuls les administrateurs peuvent mettre à jour un article');
        }
  
        const updatedArticle = await articlesService.updateArticle(articleId, req.body);
  
        socket.getIO().emit('articles', { action: 'update', article: updatedArticle });
  
        res.status(200).json(updatedArticle);
      } catch (error) {
        next(error);
      }
  }

  async delete(req, res, next) {
    try {
        const articleId = req.params.articleId;
  
        // Vérification si l'utilisateur est administrateur
        if (req.user.role !== 'admin') {
          throw new UnauthorizedError('Seuls les administrateurs peuvent supprimer un article');
        }
  
        await articlesService.deleteArticle(articleId);
  
        socket.getIO().emit('articles', { action: 'delete', articleId });
  
        res.status(204).end();
      } catch (error) {
        next(error);
      }
  }
}

module.exports = new ArticlesController();
