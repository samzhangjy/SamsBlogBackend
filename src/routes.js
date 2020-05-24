const AuthController = require('./controllers/AuthController')
const PostController = require('./controllers/PostController')
const TagController = require('./controllers/TagController')
const LinkController = require('./controllers/LinkController')

module.exports = (app) => {
  app.post('/login', AuthController.login),
  app.post('/login/remember', AuthController.loginRemember),
  app.post('/login/reset', AuthController.resetPassword),
  app.post('/post/new', PostController.addPost),
  app.get('/post/latest', PostController.getLatestPosts),
  app.get('/post/all', PostController.getAllPosts),
  app.get('/post/get/:postId', PostController.getPost),
  app.post('/post/edit/:postId', PostController.editPost),
  app.delete('/post/delete/:postId', PostController.deletePost),
  app.get('/tags/all', TagController.getAllTags),
  app.get('/tags/:name', TagController.getTag),
  app.post('/links/add', LinkController.addLink),
  app.get('/links/all', LinkController.getAllLinks),
  app.get('/links/:linkId', LinkController.getLink),
  app.post('/links/edit/:linkId', LinkController.editLink),
  app.delete('/links/delete/:linkId', LinkController.deleteLink),
  app.post('/post/search', PostController.searchPost)
}
