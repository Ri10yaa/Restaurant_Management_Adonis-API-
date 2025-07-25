import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const token = ref(localStorage.getItem('token'))

  async function api(method: string, url:string, payload = {}) {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}${url}`, {
      method,
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      body: method !== 'GET' ? JSON.stringify(payload) : null,
    })
    return res.json()
  }

  async function authenticate(result:{token: string}) {
    token.value = result.token
    localStorage.setItem('token', token.value)
    await me()
  }

  async function login(payload: {username: string, password: string}) {
    const res = await api('POST', '/login', payload)
    if(!res.success){
      return res
    }
    authenticate(res.data)
  }

  async function register(payload: {username: string, password: string}) {
    const res = await api('POST', '/register', payload)
    if(!res.success){
      return res
    }
    authenticate(res)
  }

  async function logout() {
    await api('DELETE', '/logout')
    token.value = null
    localStorage.removeItem('token')
  }

  async function me() {
    const res = await api('GET', '/me')
    user.value = res.user
    return user.value
  }
  return { user, login, logout, register, me }
})
