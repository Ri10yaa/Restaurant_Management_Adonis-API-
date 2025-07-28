<script setup>
import CardComp from '@/components/CardComp.vue';
import FoodCartComp from '@/components/FoodCartComp.vue';
import TableComp from '@/components/TableComp.vue';
import { useFoodStore } from '@/stores/food';
import { watchEffect, ref, onMounted } from 'vue';

const foodStore = useFoodStore()

const data = ref([])
const cols = ref([])

const fetchData = async () => {
    try {
        const res = await foodStore.getAllFood()
        if (res.success) {
            cols.value = foodStore.cols
            data.value = foodStore.foods
        }
    } catch (err) {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
}

watchEffect(async () => {
    fetchData()
})


onMounted(async () => {
    fetchData()
})

</script>

<template>
    <div style="display: flex; flex-direction: column;">
        <CardComp :cols="cols" :data="data" table="food" />
        <FoodCartComp />
    </div>
</template>

<style scoped>
h2 {
    color: black;
}
</style>