import axios from "axios";

class Request {
    static serverUrl = import.meta.env.VITE_API_GATEWAY

    static async get(url){
        return new Promise((resolve, reject) => {
            axios.get(this.serverUrl + url, {headers:{'Authorization': `Bearer ${window.localStorage.getItem("authToken")}`}}).then((response) => {
                resolve(response.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static post(url, object){
        return new Promise((resolve, reject) => {
            console.log(object)
            axios.post(this.serverUrl + url, object, {headers:{'Authorization': `Bearer ${window.localStorage.getItem("authToken")}`}}).then((response) => {
                let data = response.data
                if(data && data.error) reject(data)
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static put(url, object){
        return new Promise((resolve, reject) => {
            axios.put(this.serverUrl + url, object, {headers:{'Authorization': `Bearer ${window.localStorage.getItem("authToken")}`}}).then((response) => {
                let data = response.data
                if(data && data.error) reject(data)
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    static delete(url){
        return new Promise((resolve, reject) => {
            axios.delete(this.serverUrl + url, {headers:{'Authorization': `Bearer ${window.localStorage.getItem("authToken")}`}}).then((response) => {
                let data = response.data
                if(data && data.error) reject(data)
                resolve(data)
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

export default Request

