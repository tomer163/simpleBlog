<template>
    <div class="text-center ">
        <h1 class="text-8xl">{{ 'WELCOME ' + jsonData.username }}</h1>
    </div>
    <div class="flex">
        <div v-for="post in jsonData.posts" class="bg-red-500">
            <span>{{ post.title }}</span>
            <span>{{ post.description }}</span>
            <div v-for="image in post.images" class="">
                <span>{{ image.title }}</span>
                <img :src="image.path" class="w-[20%]">
            </div>
            <button :data-post-id="post.id">delte</button>
        </div>
    </div>
    <div></div>
</template>

<script setup>
import { ref, onBeforeMount, } from 'vue'
import axios from '../assets/axios'

const jsonData = ref({
    username: 'GUEST',
    posts:[
        {
            id:null,
            title:null,
            description:null,
            images:[
                {
                title:null,
                path:null
                }
            ]
        }
    ]
})

onBeforeMount(async()=>{
    const token = localStorage.getItem('token')
    if(token){
        try{
            const posts = await axios.get('/postsByCurUser')
            jsonData.value = posts.data
            Error.value=false
            console.log(posts)
        }
        catch(err){
            Error.value=true
        }
    }
})

</script>