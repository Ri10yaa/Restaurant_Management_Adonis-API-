/* eslint-disable prettier/prettier */
 import type { HttpContext } from '@adonisjs/core/http'
import { createFood, setAvailability } from '../repositories/food_repo.js'
import { validateFood } from '#validators/food'

export default class FoodsController {
    async store({ request }: HttpContext) {
        try{
            const payload = await validateFood.validate(request.body())
            const res = await createFood(payload)

            return { success: true, data: res}
        }catch(err){
            throw err;
        }
    }

    async set({} : HttpContext) {
        try{
            const res = await setAvailability()
            return { success: true, data: res}
        }catch(err){
            throw err;
        }
    }
}