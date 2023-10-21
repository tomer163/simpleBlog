<template>
    <div class="mx-8">
        <div class="text-center my-5">
            <h1 class="text-8xl">{{ 'WELCOME ' + jsonData.username }}</h1>
        </div>
        <div class="max-w-[800px] m-auto rounded-xl mb-5 overflow-hidden">
            <form class="flex flex-col gap-2 bg-gray-300">
                <div class="flex flex-row items-center bg-orange-300 p-2 h-16">
                    <div class="h-full px-5 relative flex rounded bg-orange-400 items-center mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class=" w-6 h-6 m-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                        </svg>
                        <div class="absolute top-0 right-0 h-full w-full">
                            <input type="file" id="fileInput" class="hidden">
                            <label for="fileInput" class="h-full w-full cursor-pointer">
                                <div class="h-full w-full"></div>
                            </label>
                        </div>
                    </div>
                    <div class="overflow-hidden rounded-lg flex h-full">
                        <input type="text" v-model="imageTitle" placeholder="image title" class="focus:outline-none bg-orange-200 placeholder:text-orange-400 px-2 text-orange-400 h-full">
                        <span class="m-auto right-0 bg-orange-400 text-white px-2 flex items-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                        {{ fileCount }}
                        </span>
                    </div>
                    <div class="flex flex-grow"></div>
                    <button @click.prevent="addImage" class="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffedd5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                    <button @click.prevent="deleteAllImages" class="mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffedd5" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                </div>                
                <input type="text" v-model="postTitle" placeholder="post title" class="w-[70%] m-auto">
                <input type="text" v-model="postDescription" placeholder="description" class="w-[70%] m-auto">
                <button @click="addPost" class="p-2 m-auto mb-3 bg-green-700 rounded flex text-white">
                    send
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
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
        imageTitle.value = ''
        postTitle.value = ''
        postDescription.value = ''
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