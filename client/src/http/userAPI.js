import {$host, $authHost} from "./index";
import jwt_decode from "jwt-decode"

export const registration = async (login,password) => {
    const {data} = await $host.post("user/registration", {login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}

export const login = async (login,password) => {
    const {data} = await $host.post("user/login",{login, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getHighScore = async (login) => {
    const user = await $authHost.post("user/myPosition",{login})
    return user.data.highScore
}

export const fetchRecords = async  () => {
    const {data} = await $host.get("user/standing")
    return data.rows
}

export const updateScore = async (login, score) => {
    const data = await $authHost.put("user/updateScore", {login,score})
    return data
}
export const check = async () => {
    const {data} = await $authHost.get("user/auth")
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)

}


