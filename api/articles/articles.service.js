// api/articles/articles.service.js
const Article = require('./articles.model');
const User = require('../users/users.model');
class ArticlesService {
  getAll() {
    return Article.find();
  }

  get(articleId) {
    return Article.findById(articleId);
  }

  create(userId, articleData) {
    const article = new Article({
      ...articleData,
      userId: userId,
    });
    return article.save();
  }

  update(articleId, updatedArticleData) {
    return Article.findByIdAndUpdate(articleId, updatedArticleData, { new: true });
  }

  delete(articleId) {
    return Article.findByIdAndDelete(articleId);
  }

  async getArticlesByUser(userId) {
    try {
      // Utilisez la méthode populate() pour récupérer tous les articles de l'utilisateur
      const articles = await Article.find({ userId }).populate('userId', '-password');

      return articles;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new ArticlesService();