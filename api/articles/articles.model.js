// api/articles/articles.model.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({

  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },

});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
