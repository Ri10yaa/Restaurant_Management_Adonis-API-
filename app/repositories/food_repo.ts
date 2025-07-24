/* eslint-disable prettier/prettier */
import Food from "#models/food";
import { Category } from "#validators/food";
const setCount =  async (foods: Food[], qty: number) =>{
    foods.forEach( async (element) => {
        element.availability = qty
        await element.save()
    });
}

export const createFood = async (payload : {name: string, veg: boolean, category: Category, price:number}) =>{
    const food = Food.create({
        name: payload.name,
        veg: payload.veg,
        category: payload.category,
        price: payload.price
    })
    return food
}
export const incrementCount = async (id: number, count: number) =>{
    const food = await Food.findOrFail(id)
    food.availability = food.availability + count
    return food.save()
}

export const decrementCount = async (id: number, count: number) =>{
    const food = await Food.findOrFail(id)
    food.availability = food.availability - count
    return food.save()
}

export const setAvailability = async() =>{

    const starters = await Food.findManyBy('category','starters')
    setCount(starters, 100)

    const meals = await Food.findManyBy('category','meals')
    setCount(meals, 100);

    const rice = await Food.findManyBy('category','rice')
    setCount(rice, 100);


    const breads = await Food.findManyBy('category','breads')
    setCount(breads, 50)

    const gravies = await Food.findManyBy('category','gravies')
    setCount(gravies, 50)
    
    const dosas = await Food.findManyBy('category','dosa')
    setCount(dosas, 100)

    const bvg = await Food.findManyBy('category','beverages')
    setCount(bvg, 100)

    const dessserts = await Food.findManyBy('category','desserts')
    setCount(dessserts, 50)

}
