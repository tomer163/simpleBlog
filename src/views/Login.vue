<template>
    <div class="m-8 relative h-[calc(100vh-90px)]">
        <div class="flex flex-col max-w-[400px] gap-4 m-auto absolute top-[18%] left-0 right-0 w-full">
            <h1 class="m-auto mb-[60px] text-[80px]">Log In</h1>
            <input type="text" v-model="username" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Username">
            <input type="text" v-model="password" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Password">
            <button @click="logIn" class="bg-gray-500 w-20 m-auto rounded p-1 font-bold">Log In</button>
            <RouterLink class="m-auto text-lg text-sky-600 underline" to="/signup">dont have an account? singup!</RouterLink>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import axios from '../assets/axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const username = ref('')
const password = ref('')

const logIn = async()=>{
    try{
        const res = await axios.post('/login',{
            username: username.value,
            password: password.value
        })
        localStorage.setItem('token',res.data.token)
        await router.push('/')
        location.reload()
        console.log(res)
    }
    catch(err){
        console.log(err)
    }
}

</script>