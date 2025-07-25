<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useNotification } from '@kyvg/vue3-notification';

const { notify } = useNotification()
const router = useRouter()
const auth = useAuthStore()

const form = ref({
    email: '',
    password: '',
    role: null,
    name: '',
    phno: ''
})

const roles = [
    'manager', 'staff' ,'customer'
]
async function submit() {
    const res = await auth.register(form.value)
    if (res !== undefined && !res?.success) {
        notify({
            text: `${res.message}`,
            type: 'error'
        })
    }
    else {
        router.push({ name: 'home' })
    }

}
</script>

<template>
    <div class="form-container">
        <h2> Login </h2>
        <form v-on:submit.prevent="submit">
            <label>
                <span>Username</span>
                <input type="text" v-model="form.name" placeholder="username" />
            </label>
            <label>
                <span>Phone number</span>
                <input type="text" v-model="form.phno" minlength="10" maxlength="10" pattern="[0-9]{10}"/>
            </label>
            <label>
                <span>Email</span>
                <input type="text" v-model="form.email" />
            </label>

            <label>
                <span>Password</span>
                <input type="password" v-model="form.password" />
            </label>

            <label>
                <span>Role</span>
                <select v-model="form.role">
                    <option v-for="role in roles">{{ role }}</option>
                </select>
            </label>
            <button type="submit">Register</button>
        </form>
    </div>

</template>

<style scoped>
.form-container {
    width: fit-content;
    padding: 40px;
    margin: 20px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: #EEEEEE;
    box-shadow: #393E46 0px 5px 15px;
    font-size: large;
    height: 370px;
}

form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
    color: #222831;
}

.form-container h2 {
    color: #222831;
}

form div {
    width: 400px;
}

input {
    padding: 2px;
    width: 100%;
    margin-top: 5px;
    box-sizing: border-box;
    height: 35px;
    border-radius: 5px;
    border: none;
}

input:focus {
    outline: 2px solid #00ADB5;
}

button {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: #00ADB5;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    width: fit-content;
    font-size: 17px;
    margin-top: 10px;
}

button:hover {
    background: none;
    color: #00ADB5;
}
</style>
