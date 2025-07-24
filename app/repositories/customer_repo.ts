/* eslint-disable prettier/prettier */
import Customer from "#models/customer"

export const addCustomer = async (name: string, user_id: number, phno: string) =>{
    const res = await Customer.create({
        name: name,
        user_id: user_id,
        phno: phno
    })
    return res
}

export const updateCustomer = async (id: number, payload: Customer) =>{
    const cus = await Customer.findOrFail(id)
    return await cus.merge(payload).save()
}

export const getCustomer = async (name: string) =>{
    const cus = await Customer.findByOrFail('name', name )
    return cus
}