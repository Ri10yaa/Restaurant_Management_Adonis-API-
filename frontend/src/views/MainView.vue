<script setup>
import { useAuthStore } from '@/stores/auth';
import { onMounted, watchEffect, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useNotification } from '@kyvg/vue3-notification';

import { useFoodStore } from '@/stores/food';

const { notify } = useNotification()
const show = ref('mgr')
const cols = ref([])
const data = ref([])
const isEditing = ref(false)
const editItm = ref({})
const foodStore = useFoodStore()

const auth = useAuthStore()
const router = useRouter()

auth.me()
</script>

<template>
    <div v-if="auth.user">
    <router-link to="/order"><button> Order Food </button></router-link>
    </div>
</template>

