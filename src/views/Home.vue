<template>
    <div class="mx-8">
        <div class="max-w-[800px] m-auto rounded-xl mb-5 overflow-hidden">
            <form :class="props.userInfo.id ? '' :'opacity-50'" class="flex flex-col bg-gray-300">
                <div class="flex flex-row items-center bg-orange-300 p-2 h-16">
                    <label for="fileInput" class="flex cursor-pointer items-center h-full px-5 text-white bg-orange-400 rounded mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class=" w-6 h-6 m-auto">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" />
                        </svg>
                    </label>
                    <input type="file" id="fileInput" class="hidden">
                    <div class="overflow-hidden rounded-lg flex h-full">
                        <input type="text" v-model="imageTitle" placeholder="image title" class="focus:outline-none bg-orange-200 placeholder:text-orange-400 px-2 text-orange-400 h-full">
                        <span class="m-auto right-0 bg-orange-400 text-white px-2 flex items-center h-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <div>{{ fileCount }}</div>
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
                <div class="border border-gray-500 w-[80%] m-auto rounded-xl overflow-hidden my-5">
                    <input type="text" v-model="postTitle" placeholder="post title" class="w-full focus:outline-none px-3 py-1 border border-b-black bg-gray-100 placeholder:text-gray-500">
                    <input type="text" v-model="postDescription" placeholder="description" class="w-full focus:outline-none px-3 py-1 bg-gray-100 placeholder:text-gray-500">
                </div>
                <button @click="addPost" class="p-2 m-auto mb-3 bg-green-700 rounded flex text-white">
                    send
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6 ml-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </form>
            <div v-for="post in jsonData" class="bg-stone-300 border border-t-gray-500 m-auto px-10 py-3">
                <div class="flex my-2">
                    <span class="mr-3">{{ "@" + post.author.username }}</span>
                    <div class="grow"></div>
                    <span>{{ post.createdAt }}</span>
                </div>
                <h1 class="text-4xl my-2">{{ post.title }}</h1>
                <div v-for="image in post.images" class="relative w-full m-auto rounded-xl overflow-hidden">
                    <img :src="image.path" class=" w-full" draggable="false">
                    <div class="absolute left-0 right-0 bottom-[15%] w-full max-h-min text-white text-center bg-[#00000080]">
                        <span class="text-white text-lg bottom-1 right-0 left-0 text-center">{{ image.title }}</span>
                    </div>
                </div>
                <p class="text-2xl my-2">{{ post.description }}</p>
                <div class="flex items-center">
                    <button v-if="post.userId === props.userInfo.id" @click="deletePost(post.id)" class="bg-red-500 p-2 rounded text-white mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                        </svg>
                    </button>
                    <button @click="showComments(post.id)" class="bg-green-500 p-2 rounded text-white mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
                        </svg>
                    </button>
                    <div v-if="commentScreen" class="fixed bg-[#00000070] top-0 bottom-0 left-0 right-0 z-20">
                        <div class="absolute top-[20%] right-0 left-0 m-auto max-w-fit min-w-[500px] pb-4 bg-stone-300 rounded-xl flex flex-col">
                            <button @click="hideComments()">exit</button>
                            <input type="text" v-model="commentText" @keyup.enter="addComment(post.id)" class="w-[80%] mx-auto">
                            <div class="flex flex-col max-h-[500px] overflow-y-auto">
                                <div v-for="comment in commentData" class="flex border border-b-black">
                                    <span>{{ comment.writer.username }}</span>
                                    <span>{{ ": " + comment.content }}</span>
                                    <button v-if="comment.writer.id === props.userInfo.id" @click="deleteComment(comment.id)" class="ml-2">delete</button>
                                    <div class="grow"></div>
                                    <span class="mr-2">{{ comment.createdAt }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onBeforeMount} from 'vue'
import axios from '../assets/axios'

const props = defineProps(['userInfo'])

const jsonData = ref()

onBeforeMount(async()=>{
    try{
        const posts = await axios.get('/allPosts')
        jsonData.value = posts.data
        console.log(jsonData.value)
    }
    catch(err){
        jsonData.value = []
        console.log(jsonData.value)
        console.log(err)
    }
})

const imageTitle =ref('')
const postTitle =ref('')
const postDescription =ref('')

let form = new FormData();

const fileCount = ref(0)

async function addPost(){
    try {
        form.append('title', postTitle.value)
        form.append('description', postDescription.value)
        const createdpost = await axios.post('/createPostForCurUser', form, {headers:{ "Content-Type":"multipart/form-data" }})
        form = new FormData();
        jsonData.value.splice(0,0,createdpost.data)
        console.log(jsonData.value)
        imageTitle.value = ''
        postTitle.value = ''
        postDescription.value = ''
        fileCount.value = 0
    }
    catch(err){
        console.log(err)
    }
}

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
        let newPosts = jsonData.value
        console.log(newPosts)
        newPosts = newPosts.filter(post => post.id !== postId)
        jsonData.value = newPosts
    }
    catch(err){
        console.log(err)
    }
}

const commentData = ref([])

const commentText = ref("")

const commentScreen = ref(false)

let postIdComments = ""

async function showComments(postId){
    try{
        commentScreen.value = true
        postIdComments = postId
        const comments = await axios.get(`/getPostComments/${postId}`)
        commentData.value = comments.data
        console.log(postId)
        console.log(commentData.value)
    }
    catch(err){
        console.log(err)
    }
}


async function addComment(){
    try{
        const comment = await axios.post(`/addComment/${postIdComments}`,{
            content: commentText.value
        })
        commentData.value.push(comment.data)
        console.log(postIdComments)
        console.log(commentData.value)
        commentText.value = ""

    }
    catch(err){
        console.log(err)
    }
}

async function deleteComment(commentId){
    try{
        const deleted = await axios.delete(`/deleteComment/${commentId}`)
        let newarr = commentData.value
        newarr = newarr.filter(comment => comment.id !== commentId)
        commentData.value = newarr
    }
    catch(err){
        console.log(err)
    }
}


function hideComments(){
    commentScreen.value = false
    commentData.value = []
    postIdComments = ''
}

</script>

<style lang="scss">
$yo: red;

</style>