import { defineStore } from "pinia";
import { ref } from "vue";
import type food from "@/interfaces/food";
import { useAuthStore } from "./auth";
import axios from "axios";

export const useCartStore = defineStore('cart', () =>{
    const orders = ref<food[]>()
    const cost = ref(0)
    const authStore = useAuthStore()
    const token = ref(localStorage.getItem('token'))

    async function addToCart(itm: food){
        console.log(itm)
        orders.value?.push(itm);
        cost.value += itm.amt
    }

    async function removeFromCart(itm: food){
        orders.value?.filter(ele => {
            ele !== itm
        })
        cost.value -= itm.price * itm.qty
    }

    async function placeOrder(){
        let user = authStore.user
        let dishes = []

        if(orders.value !== undefined){
            for(const itm of orders.value){
            dishes.push({'food_id' : itm.id, 'qty': itm.qty })
        }
        }
        
        console.log('Dishes : ', dishes)
        const payload = {
            'cus_id' : user?.id,
            'status' : 'confirmed',
            'amount' : cost.value,
            'dishes' : dishes
        }
        console.log('Payload defined.')
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders`, payload, {
            headers:{
                'Authorization' :  `Bearer ${token.value}`
            }
        })
        console.log('Res data : ', res.data)
        return res.data
    }


    return { orders, cost, addToCart, removeFromCart, placeOrder}
})