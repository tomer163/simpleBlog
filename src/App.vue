<template>
  <div class="flex">
    <div v-if="!logged.id" v-for="route in routes">
      <RouterLink :to="route.path" class="m-2">{{ route.name }}</RouterLink>
    </div>
    <div v-if="logged.id" class="ml-auto">
      <span>{{ logged.username }}</span>
      <button @click="logout" class="mx-2">logout</button>
    </div>
  </div>
  <RouterView :user-info="logged" @Logged-in="atLogIn"></RouterView>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import routes from './assets/routes'
import axios from './assets/axios.js'

const router = useRouter()

const logged = ref({id:null})

onBeforeMount(async()=>{
  try{
      const userInf = await axios.get('/curUserInfo')
      logged.value = userInf.data
  }
  catch(err){
    console.log(err)
  }
})

async function atLogIn(){
  const userInf = await axios.get('/curUserInfo')
  logged.value = userInf.data
}



async function logout(){
  localStorage.removeItem('token')
  logged.value = {id:null}
  await router.push('/login')
}

</script>
