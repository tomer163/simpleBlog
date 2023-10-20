<template>
    <div class="relative m-8 h-[calc(100vh-90px)]">
        <div class="absolute w-full flex flex-col max-w-[400px] gap-4 left-0 right-0 mx-auto my-auto top-0 bottom-28 max-h-fit">
            <h1 class="m-auto mb-[60px] text-[80px]">Log In</h1>
            <input @click="Error = false" type="text" v-model="username" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Username">
            <input @click="Error = false" type="password" v-model="password" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Password">
            <button @click="logIn" class="bg-gray-500 w-20 m-auto rounded p-1 font-bold">Log In</button>
            <RouterLink class="m-auto text-lg text-sky-600 underline" to="/signup">dont have an account? singup!</RouterLink>
            <span v-if="Error" class="m-auto w-full bg-red-300 text-center rounded border-2 border-red-500 text-red-500 text-lg font-bold py-2">something went wrong... :(</span>
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

const Error = ref(false)

const logIn = async()=>{
    try{
        const res = await axios.post('/login',{
            username: username.value,
            password: password.value
        })
        localStorage.setItem('token',res.data.token)
        router.push('/')
        console.log(res)
    }
    catch(err){
        Error.value=true
        console.log(err)
    }
}

</script>