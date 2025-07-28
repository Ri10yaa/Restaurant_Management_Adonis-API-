<script setup>
import { useCartStore } from '@/stores/cart';
import { notify } from '@kyvg/vue3-notification';
import { computed, defineEmits, onMounted, watch, watchEffect } from 'vue';
import { ref } from 'vue';

const props = defineProps(['cols', 'data', 'table'])

const columns = ref([...props.cols])
const data = ref([...props.data])
const paginatedItems = ref([])
const num = 10;
const searchFor = ref('')
const title = ref('')
const cartStore = useCartStore()

const startIndex = ref(0)
const endIndex = ref(startIndex.value + num)
const currPage = ref(0)

const noOfPages = computed(() => {
    return Math.ceil(data.value.length / num)
})

const increment = (itm) =>{
    if(itm.qty < itm.availability){
        itm.qty++;
    }
    
}

const decrement = (itm) =>{
    if(itm.qty > 0){
        itm.qty--;
    }
    
}

const search = (e) => {
    searchFor.value = e.target.value
}

const handlePrev = () => {
    if (currPage.value !== 0) {
        currPage.value--;
        startIndex.value = currPage.value * num
        endIndex.value = startIndex.value + num
    }
}

const handleNext = () => {
    if (currPage.value !== noOfPages.value - 1) {
        currPage.value++;
        startIndex.value = currPage.value * num
        endIndex.value = startIndex.value + num
    }
}

const format = (items) => {
    for (const itm of items) {
        if (itm.veg == true) {
            itm.veg = 'Veg'
        }
        else {
            itm.veg = 'Non-veg'
        }
    }
    return items
}

const addTocart = async (itm) =>{
    try{
        itm.amt = itm.price*itm.qty
        await cartStore.addToCart(itm)
    }catch(err){
        notify({
            type: 'success',
            text: `${err.message}`
        })
    }
    
}


const filteredItems = computed(() => {
    if (searchFor.value !== '') {
        //return data.value.filter(emp => emp.Name.toLowerCase().includes(searchFor.value.toLowerCase()))  // for single column
        paginatedItems.value = data.value.slice(startIndex.value, endIndex.value).filter(obj =>
            Object.values(obj).some((ele) =>
                String(ele).toLowerCase().includes(searchFor.value.toLowerCase()),
            ),
        )
    }
    else {
        paginatedItems.value = data.value.slice(startIndex.value, endIndex.value)
    }

    return paginatedItems.value
})

watchEffect(() => {
    columns.value = [...props.cols]
    data.value = [...props.data]

     data.value.forEach(element => {
        element.qty = 1;
        element.amt = 0;
    });
})

</script>

<template>
    <div>
        <h2> Menu </h2>
        <div class="card" v-for="itm in filteredItems" :key="itm.id">
            <p class="title">{{ itm.name }}</p>
            <p class="subtitle">
            <div>{{ itm.veg === true ? 'Veg' : 'Non-Veg' }}</div>
            <div> Availability: {{ itm.availability }}</div>
            </p>
            <div class="price"> &#8377; {{ itm.price*itm.qty }}</div>
                <div class="quantity-toggle">
                    <button @click="decrement(itm)">&mdash;</button>
                    <input type="text" :value="itm.qty" readonly>
                    <button @click="increment(itm)">&#xff0b;</button>
                </div>
    
            <button @click="addTocart(itm)" class="button-add"> Add to cart</button> 
        </div>

    </div>

</template>

<style scoped>
h2{
    color: black;
    margin:5px;
}
.card {
    color: black;
    background-color: #f5e8dd7b;
    margin: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 4px;
    width: 60%;
    position: relative;
    height: fit-content;
}

.title {
    font-size: large;
}

.subtitle {
    font-weight: 300;
    color: #4e5559;
    display: flexbox;
    flex-direction: row;
}

.price {
    top: 10px;
    right: 10px;
    position: absolute;
    font-size: large;
}

.button-add {
    bottom: 10px;
    right: 10px;
    position: absolute;
    border: none;
    outline: none;
    background: none;
    background-color: #DF7861;
    font-size: 18px;
    padding: 7px;
    border-radius: 4px;
}

.quantity-toggle{
    bottom: 10px; 
    right: 130px;
    position: absolute;
}

.quantity-toggle input{
    width: 40px;
    border: none;
    outline: none;
    color: black;
    
}

.quantity-toggle button{
    border: none;
    outline: none;
    background: none;
    background-color: #D4E2D4;
    border-radius: 4px;
    margin: 4px;
    padding-right: 5px;
    padding-left: 5px;
    padding-top: 3px;
    padding-bottom: 3px;
}

</style>