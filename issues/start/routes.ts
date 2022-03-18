import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('project', 'ProjectsController')
  Route.resource('issues', 'IssuesController')
  Route.resource('issues.comments', 'CommentsController')
}).middleware('auth')



Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
