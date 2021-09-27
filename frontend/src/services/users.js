import axios from "axios"
import tokenHolder from "./tokenHolder"
const baseUrl = '/api/users'



const signUp = async newUser => {
    const response = await axios.post(baseUrl, newUser)
    return response.data
}
const updateUser = async updatedUser => {
    const respones = await axios.put(baseUrl, updatedUser)
    return respones.data
}
const getUsers = async (keyWord, pageNumber) => {
    const respones = await axios.get(`${baseUrl}?keyWord=${keyWord}&pageNumber=${pageNumber}`)
    return respones.data
}
const getFollowing = async id => {
    const respones = await axios.get(`${baseUrl}/${id}/following`)
    return respones.data
}
const followUser = async (id) => {
    const response = await axios.put(`${baseUrl}/follow`, {userToFollow: id})
    return response.data
}
export default {
    signUp, updateUser, getUsers, getFollowing, followUser
}