import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useFoodStore = defineStore('food', () => {
    const foods = ref([])
    const cols = [
        { label:'Name', key: 'name'},
        { label:'Category', key: 'category'},
        { label:'Price', key: 'price'},
        { label:'Veg / Non-Veg', key: 'veg'},
    ]
    const token = ref(localStorage.getItem('token'))

    const getAllFood = async () =>{
    try{
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/food/all`,{
            headers:{
                'Authorization': `Bearer ${token.value}`,
            }
        })
        foods.value = res.data.data
        return res.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return error.response?.data
        }
    }
  }

})