<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

function toLogin(){
  router.push({name: 'login'})
}

function toRegister(){
  router.push({name: 'register'})
}
</script>

<template>
    <div class="onboard">
    <div style="margin-right: 50px;">
      <h1> Welcome!</h1>
    </div>
    
    <div class="links">
      <button @click="toLogin" style="margin-right: 80px;">Login</button>
      <button @click="toRegister">Register</button>
    </div>
  </div>
</template>

<style scoped>

.onboard {
  background-color: #EEEEEE;
  box-shadow: #393E46 0px 5px 15px;
  border-radius: 8px;
  padding: 20px;
  color: #222831;
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  margin-left: 300px;
  align-items: left;
  margin-top: 15%;
}

.links{
  display: flex;
  flex-direction: row;
  margin-top: 100px;
  margin-left: 20px;
  margin-right: 20px;
  font-size: larger;
  padding: 10px;
  
}

button{
  background-color: #00ADB5;
  border-radius: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 20px;
  padding-right: 20px;
  border: none;
  font-weight: medium;
  font-size: large;
}

button:hover{
  color: #00ADB5;
  background: none;
}

</style>