/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'

export enum Role{
    STAFF = 'staff',
    MANAGER = 'manager'
}

export const postCustomer = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(30),
        phno: vine.string().fixedLength(10)
    })
)

export const postUser = vine.compile(
    vine.object({
        email: vine.string().email().unique(async (db, value)=>{
            const match = await db.query().from('users').select('id').where('email',value).first()
            return !match
        }),
        password: vine.string().minLength(8),
        role: vine.enum(['manager','staff','customer'])
    })
)

export const validateLogin = vine.compile(
    vine.object({
        email: vine.string().email(),
        password: vine.string().minLength(8),
        role: vine.enum(['manager','staff','customer'])
    })
)

export const postStaff = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(30),
        phno: vine.string().fixedLength(10),
        role: vine.enum(Role)
    })
)