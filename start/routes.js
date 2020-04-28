'use strict'

const Route = use('Route')

//Admin
Route.post('/users', 'UserController.create') 
Route.post('/login', 'SessionController.create')

//Studenties
Route.resource('students', 'StudentController').apiOnly().middleware('auth')

//Attendances
Route.resource('attendances', 'AttendanceController').apiOnly().middleware('auth')

//Charge
Route.resource('charge', 'ChargeController').apiOnly().middleware('auth')

//Statistics
Route.get('/statistcsDay', 'StatisticController.statistcsDay').middleware('auth')
Route.get('/statisticsStudent/:id', 'StatisticController.statisticsStudent').middleware('auth')


