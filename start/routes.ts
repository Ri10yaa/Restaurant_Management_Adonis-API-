/* eslint-disable prettier/prettier */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// import auth from '@adonisjs/auth/services/main'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(()=>{
  router.post('/login','#controllers/users_controller.login') // email, pass, role
  router.post('/register', '#controllers/users_controller.register')  // email pass name role phno
  router.delete('/logout','#controllers/users_controller.logout').use(middleware.auth())

}).prefix('/auth')


router.group(()=>{

  router.get('/:id','#controllers/orders_controller.show') 
  router.post('/','#controllers/orders_controller.store')  // cus_id, status ( optional ), dishes  = { 'food_id': '', 'qty' : ''}

  router.patch('/:id/dish','#controllers/orders_controller.updateByDish') //  body : food_id and qty 
  router.patch('/:id/dish/:foodId','#controllers/orders_controller.updateByDeleteDish')  
  router.patch('/:id/status','#controllers/orders_controller.updateOrderStatus').use(middleware.staffAuth()) // body: status

  router.delete('/:id','#controllers/orders_controller.destroy') 

}).prefix('/orders').use(middleware.auth())


router.group(()=>{
 router.get('/all','#controllers/foods_controller.index') 
 router.post('/', '#controllers/foods_controller.store').use(middleware.managerAuth()) // name veg  category price
 router.patch('/set','#controllers/foods_controller.set').use(middleware.managerAuth())  // set availability
 router.delete('/:id','#controllers/foods_controller.destroy').use(middleware.managerAuth())
  
}).prefix('/food').use(middleware.auth())


router.group(()=>{
  /*
  -- make reserva - post
  -- delete
  -- update patch
  -- get reservations by cus ID
  */
}).prefix('/reserve').use(middleware.auth()) 

router.group(()=>{
  /*
  -- add staff
  -- del staff
  -- update staff
  -- get staff
  */
}).prefix('staff').use(middleware.managerAuth())



