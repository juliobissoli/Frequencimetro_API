'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create') 
Route.post('/login', 'SessionController.create')
Route.resource('students', 'StudentController').apiOnly().middleware('auth')
Route.resource('attendances', 'AttendanceController').apiOnly().middleware('auth')
Route.get('/statistcsDay', 'StatisticController.statistcsDay').middleware('auth')
