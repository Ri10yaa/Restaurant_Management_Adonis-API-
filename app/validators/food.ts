/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'
import { checkID } from '#start/Rules/check_id'
export enum Category{
    MEALS = 'meals',
    RICE = 'rice',
    BREADS = 'breads',
    GRAVIES = 'gravies',
    DOSA = 'dosa',
    BEVERAGES = 'beverages',
    DESSERTS = 'desserts',
    STARTERS = 'starters'
}

export const validateFood = vine.compile(
    vine.object({
        name: vine.string().minLength(3),
        veg: vine.boolean(),
        category: vine.enum(Category),
        price: vine.number()
    })
)

export const validateId = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'foods' })),
  })
)