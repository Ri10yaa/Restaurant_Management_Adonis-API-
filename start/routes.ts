/* eslint-disable prettier/prettier */
/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import auth from '@adonisjs/auth/services/main'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'


router.group(()=>{
  /*
  -- Need login - post
  */

  router.post('/', '#controllers/users_controller.register')  // email pass name role phno
}).prefix('/auth')


router.group(()=>{
  /*
  -- update - put / patch
  -- delete - delete
  -- get orders by customer ID - get
  */

  router.post('/','#controllers/orders_controller.store')  // cus_id, status, amt, dishes  = { 'food_id': '', 'qty' : ''}
}).prefix('/orders')

router.group(()=>{
  /*
  -- make reserva - post
  -- delete
  -- update patch
  -- get reservations by cus ID
  */
}).prefix('/reserve')

router.group(()=>{
  /*
  -- add
  -- delete
  -- update patch
  */
 router.post('/', '#controllers/foods_controller.store') // name veg  category price
 router.patch('/set','#controllers/foods_controller.set')
  
}).prefix('/food')

router.group(()=>{
  /*
  -- reset aval
  -- inc / desc aval
  */
}).prefix('staff')

