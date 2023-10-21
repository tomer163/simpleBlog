<template>
    <div class="mx-8">
        <div class="text-center my-5">
            <h1 class="text-8xl">{{ 'WELCOME ' + jsonData.username }}</h1>
        </div>
        <div class="max-w-[800px] m-auto bg-stone-300 p-4 rounded-xl mb-5">
            <form class="flex flex-col gap-2">
                <div class="flex flex-row bg-stone-500 p-2 rounded-xl">
                    <input type="file" id="fileInput">
                    <input type="text" v-model="imageTitle" placeholder="image title">
                    <span class="m-auto">{{ 'images loaded: ' + fileCount }}</span>
                    <button @click.prevent="addImage" class="ml-auto mr-3 bg-green-700 px-2 rounded-full">add</button>
                    <button @click.prevent="deleteAllImages" class="ml-auto mr-3 bg-red-700 px-2 rounded-full">delete all</button>
                </div>                
                <input type="text" v-model="postTitle" placeholder="post title" class="w-[70%] m-auto">
                <input type="text" v-model="postDescription" placeholder="description" class="w-[70%] m-auto">
                <input @click.prevent="addPost" type="submit" class="m-auto p-2" placeholder="submit">
            </form>
        </div>
        <div v-if="jsonData.id" class="flex flex-col gap-5">
            <div v-for="post in jsonData.posts" class="bg-stone-300 rounded-xl max-w-[500px] m-auto px-10 py-3">
                <h1 class="text-4xl text-center">{{ post.title }}</h1>
                <p class="text-2xl text-center">{{ post.description }}</p>
                <div v-for="image in post.images" class="relative w-full m-auto rounded-xl overflow-hidden mb-5">
                    <img :src="image.path" class=" w-full" draggable="false">
                    <div class="absolute left-0 right-0 bottom-0 w-full h-20 bg-gradient-to-t from-black via-black via-30% to-transparent text-white text-center">
                        <span class="absolute text-white text-lg bottom-1 right-0 left-0 text-center">{{ image.title }}</span>
                    </div>
                </div>
                <button @click="deletePost(post.id)">delete</button>
            </div>
        </div>
        <div></div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount, } from 'vue'
import axios from '../assets/axios'

const jsonData = ref({
    username: 'GUEST'
})

onBeforeMount(async()=>{
    const token = localStorage.getItem('token')
    if(token){
        try{
            const posts = await axios.get('/postsByCurUser')
            jsonData.value = posts.data
            console.log(jsonData.value)
        }
        catch(err){
            console.log(err)
        }
    }
})

const imageTitle =ref('')
const postTitle =ref('')
const postDescription =ref('')

const form = new FormData();

async function addPost(){
    try {
        form.append('title', postTitle.value)
        form.append('description', postDescription.value)
        const createdpost = await axios.post('/createPostForCurUser', form, {headers:{ "Content-Type":"multipart/form-data" }})
        console.log(createdpost)
        jsonData.value.posts.splice(0,0,createdpost.data)
    }
    catch(err){
        console.log(err)
    }
}

const fileCount = ref(0)
let imageNames = []

function addImage(){
    const fileInput = document.getElementById('fileInput')
    form.append(imageTitle.value, fileInput.files[0])
    imageNames.push(imageTitle.value)
    fileInput.value = null
    imageTitle.value =''
    fileCount.value++
}

function deleteAllImages(){
    imageNames.forEach(image => {
        form.delete(image)
    })
    fileCount.value=0
    imageTitle.value = ''
    imageNames=[]
}

async function deletePost(postId){
    try{
        const deleted = await axios.delete(`/deleteCurUserPost/${postId}`)
        let newPosts = jsonData.value.posts
        newPosts = newPosts.filter(post => post.id !== deleted.data.id)
        jsonData.value.posts = newPosts
    }
    catch(err){
        console.log(err)
    }
}

</script>