import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 10000,
    headers:{
        "Content-Type":'application/json'
    }
})

console.log(import.meta.env)

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem('token')

        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        else{
            delete api.defaults.headers.common.Authorization
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api