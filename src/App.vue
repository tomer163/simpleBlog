<template>
  <div class="flex">
    <div v-if="!logged" v-for="route in routes">
      <RouterLink :to="route.path" class="m-2">{{ route.name }}</RouterLink>
    </div>
    <div class="flex flex-grow"></div>
    <span>{{ logged }}</span>
    <button v-if="logged" @click="logout" class="mx-2">logout</button>
  </div>
  <RouterView @LoggedIn="atLogIn"></RouterView>
</template>

<script setup>

import { ref, onBeforeMount } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import routes from './assets/routes'
import axios from './assets/axios.js'

const router = useRouter()

const logged = ref()

onBeforeMount(async()=>{
  try{
      const yo = await axios.get('/curUserInfo')
      logged.value = yo.data.username
  }
  catch(err){
    console.log(err)
    logged.value = undefined
  }
})

async function atLogIn(){
  const yo = await axios.get('/curUserInfo')
  logged.value = yo.data.username
}



async function logout(){
  localStorage.removeItem('token')
  logged.value = undefined
  await router.push('/login')
  console.log(logged.value)
}

</script>
