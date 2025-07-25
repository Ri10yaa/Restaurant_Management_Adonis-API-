/* eslint-disable prettier/prettier */
 import type { HttpContext } from '@adonisjs/core/http'
import { createFood, setAvailability, getAllItems, deleteFood } from '../repositories/food_repo.js'
import { validateFood, validateId } from '#validators/food'

export default class FoodsController {
    async index({}: HttpContext) {
        try{
            const foods = await getAllItems();
            return { success: true, data : foods}
        }catch(err){
            throw err;
        }
    }

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

    async destroy({params}: HttpContext){
        try{
            const param = await validateId.validate(params)
            await deleteFood(param.id)

            return { success: true, data: "Food deleted successfully!"}
        }catch(err){
            throw err;
        }
    }
}