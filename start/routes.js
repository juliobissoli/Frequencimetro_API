'use strict'

const Route = use('Route')

//Admin
Route.post('/users', 'UserController.create').middleware('auth')
Route.post('/add_admin', 'UserController.addAdmin')
Route.get('/listUser', 'UserController.index')
Route.get('/showUser/:id', 'UserController.show')
Route.delete('/user/:id', 'UserController.destroy').middleware('auth')
Route.put('/user/:id', 'UserController.update').middleware('auth')



Route.post('/login', 'SessionController.create')

//Studenties
Route.resource('students', 'StudentController').apiOnly().middleware('auth')

//Attendances
Route.resource('attendances', 'AttendanceController').apiOnly().middleware('auth')

//Charge
Route.resource('charge', 'ChargeController').apiOnly().middleware('auth')

//Payment
Route.resource('payment', 'PaymentController').apiOnly().middleware('auth')

//Statistics
Route.get('/statistcsDay', 'StatisticController.statistcsDay').middleware('auth')
Route.get('/statisticsStudent/:id', 'StatisticController.statisticsStudent').middleware('auth')
Route.get('/paymenToStudnet/:id', 'StatisticController.paymenToStudnet').middleware('auth')
Route.put('/updatePercentPayment/:id', 'StatisticController.updatePercentPayment').middleware('auth')




