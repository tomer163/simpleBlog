import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api/',
    timeout: 10000,
    headers:{
        "Content-Type":'application/json'
    }
})

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