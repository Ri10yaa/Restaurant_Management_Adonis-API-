/* eslint-disable prettier/prettier */
import Staff from "#models/staff"
import { Role } from "#validators/user"
export const addStaff = async (name: string, user_id: number, phno: string, role: Role) =>{
    const res = await Staff.create({
        name: name,
        user_id: user_id,
        phno: phno,
        role: role
    })
    return res
}

export const updateStaff = async (id: number, payload: Staff) =>{
    const staff = await Staff.findOrFail(id)
    return await staff.merge(payload).save()
}

export const getStaff = async (name: string, role: Role) =>{
    const staff = await Staff.query().where('name', name).andWhere('role', role);
    return staff
}