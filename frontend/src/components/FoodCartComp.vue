<script setup>
import { useCartStore } from '@/stores/cart';
import { notify } from '@kyvg/vue3-notification';
import { ref, onMounted, watch } from 'vue';

const cartStore = useCartStore()
const orders = ref([])
const cols = ['Item Name', 'Qty', 'Price', 'Amount']
const cost = ref(0)
const isPaymentProcess = ref(false)

const fetchData = async () => {
    orders.value = cartStore.orders
    cost.value = cartStore.cost
}

const handleOrder = async () => {
    try {
        isPaymentProcess.value = true

        setTimeout(() => {
            isPaymentProcess.value = false
            let res;
            cartStore.placeOrder().then(response => res = response).catch(error => {
                notify({
                    type:'error',
                    text:`${error}`
                })
            });
            console.log(res)
            if (res.success) {
                notify({
                    type: 'success',
                    text: 'Order confirmed'
                })
            }
    }, "3000")

    }catch (err) {
            notify({
                type: 'error',
                text: `${err.message}`
            })
        }
    console.log('inside hanlder...')

}

onMounted(() => {
    fetchData()
})

watch(() => {
    fetchData()
})

</script>

<template>
    <div class="cart-container" v-if="orders!== undefined && orders.length > 0">
        <h2> Ordered Items</h2>
        <div>
            <table>
                <thead>
                    <tr>
                        <th v-for="col in cols" :key="col" style="align-content: center">
                            {{ col }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="itm in orders">
                        <td>{{ itm.name }}</td>
                        <td>{{ itm.qty }}</td>
                        <td>&#8377;{{ itm.price }}</td>
                        <td>&#8377;{{ itm.amt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="price">Total Price : &#8377;{{ cost }}<button @click="handleOrder()"> {{ isPaymentProcess === true ?
            'Processing payment' : 'Checkout' }}</button></div>

    </div>

</template>

<style scoped>
.cart-container {
    width: fit-content;
    height: fit-content;
    padding: 15px;
    border-radius: 5px;
    background-color: #D4E2D4;
    color: black;
    margin: 10px;
    position: relative
}

.main {
    display: flex;
    flex-direction: row;
}

.price {
    font-size: 20px;
    bottom: 10px;
    right: 10px;
    position: absolute;
}

button {
    /* bottom: 10px;
    right: 10px; */
    /* position: absolute; */
    border: none;
    outline: none;
    background: none;
    background-color: #DF7861;
    font-size: 18px;
    padding: 7px;
    border-radius: 4px;
    margin-left: 10px;
}

table {
    border-radius: 8px;
    border-spacing: 0;
    color: #222831;
    margin-top: 10px;
    margin-bottom: 35px;
}

td {
    padding: 10px;
    width: inherit;
    text-align: center;
}

tr {
    width: inherit;
    padding: 20px;
}

thead tr {
    background-color: #DF7861;
    font-size: 16px;
    font-style: normal;
    font: 1em sans-serif;
    gap: 0;
    height: 30px;
}

thead th {
    padding: 10px;
}

thead tr:first-child th:first-child {
    border-top-left-radius: 8px;
}

thead tr:first-child th:last-child {
    border-top-right-radius: 8px;
}

tbody tr:last-child td:first-child {
    border-bottom-left-radius: 8px;
}

tbody tr:last-child td:last-child {
    border-bottom-right-radius: 8px;
}

thead th:not(:last-child) {
    border-right: 1px solid black;
}

tbody tr:not(:last-child) {
    border-bottom: 1px solid #555879;
}
</style>