<template>
    <div class="m-8 relative h-[calc(100vh-90px)]">
        <div class="flex flex-col max-w-[400px] gap-4 m-auto absolute top-[18%] left-0 right-0 w-full">
            <h1 class="m-auto mb-[60px] text-[80px]">Sign Up</h1>
            <input type="text" v-model="username" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Username">
            <input type="text" v-model="password" class="bg-stone-100 rounded-full border-2 border-stone-500 focus:border-sky-500 focus:outline-none px-6 py-1 text-xl placeholder:text-stone-700" placeholder="Password">
            <button @click="signUp" class="bg-gray-500 w-20 m-auto rounded p-1 font-bold">Sign Up</button>
            <RouterLink class="m-auto text-lg text-sky-600 underline" to="/login">alredey have an account? login!</RouterLink>
            <span v-if="Error" class="m-auto w-full bg-red-300 text-center rounded border-2 border-red-500 text-red-500 text-lg font-bold py-2">something went wrong... :(</span>
            <span v-if="isOk" class="m-auto w-full bg-green-300 text-center rounded border-2 border-green-700 text-green-700 text-lg font-bold py-2">account created!</span>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue'
import axios from 'axios'
import { RouterLink } from 'vue-router'

const username = ref('')
const password = ref('')

const isOk = ref(false)
const Error = ref(false)

async function signUp(){
    try{
        const res = await axios.post('http://localhost:3000/api/signup',{
            username: username.value,
            password: password.value
        })
        isOk.value = true
        Error.value = false

        console.log(res)
    }
    catch(err){
        console.log(err)
        Error.value = true
        isOk.value = false
    }
}

</script>