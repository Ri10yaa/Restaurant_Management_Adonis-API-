<script setup>
import { computed, defineEmits, onMounted, watch, watchEffect } from 'vue';
import { ref } from 'vue';

const props = defineProps(['cols', 'data', 'table'])

const columns = ref([...props.cols])
const data = ref([...props.data])
const paginatedItems = ref([])
const num = 10;
const searchFor = ref('')
const title = ref('')

const startIndex = ref(0)
const endIndex = ref(startIndex.value + num)
const currPage = ref(0)

const noOfPages = computed(() => {
    return Math.ceil(data.value.length / num)
})


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


watchEffect(() => {
    columns.value = [...props.cols]
    data.value = [...props.data]
})


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

</script>

<template>
    <div class="header">
        <h2 style="margin-left: 30px; margin-bottom: 10px;">{{ title }}</h2>
        <form @submit.prevent style="margin: 10px; padding-right: 23px;">
            <input type="text" @input="search" style="height: 25px" placeholder="search" />
        </form>
    </div>

    <div class="list-container" v-if="data.length > 0">
        <table>
            <thead>
                <tr>
                    <th v-for="col in columns" :key="col.key" style="align-content: center">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="itm in filteredItems" :key="itm.mgrId">
                    <td v-for="col in columns" :key="col.key">{{ itm[col.key] === null ? 'NULL' : itm[col.key] }}</td>
                </tr>
            </tbody>
        </table>
        <div class="page-b">
            <button @click="handlePrev"> Prev </button>
            <p> Page {{ currPage + 1 }} of {{ noOfPages }}</p>
            <button @click="handleNext"> Next </button>
        </div>
    </div>
    <div v-else style="margin: 20px;">
        No {{ title }} found!
    </div>

</template>

<style scoped>
.list-container {
    width: fit-content;
    padding: 20px;
    border-radius: 8px;
    background-color: #393e4647;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    margin-bottom: 20px;
    margin-left: 30px;
    margin-right: 30px;
}

.header{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

input {
    padding: 5px;
    width: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    border-radius: 5px;
    border: none;

}
input:focus{
    outline: 2px solid #00ADB5 ;
}

table {
    border-radius: 8px;
    border-spacing: 0;
    color: #222831;
    margin-top: 10px;
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
    background-color: #00ADB5;
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


.page-b {
    /* background-color: #EEEEEE; */
    background: none;
    /* box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px; */
    border-radius: 8px;
    padding: 10px;
    width: fit-content;
    justify-self: center;
    justify-content: space-between;
    display: flex;
    flex-direction: row;
}

.page-b button {
    background-color: #00ADB5;
    margin: 3px;
    border: none;
    outline: none;
    color: #faf7f3;
    border-radius: 3px;
    padding: 5px;
    font-weight: bolder;
}
</style>