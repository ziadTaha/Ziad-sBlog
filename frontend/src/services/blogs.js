import axios from "axios"
import tokenHolder from "./tokenHolder"
const baseUrl = '/api/blogs'

const getPersonal = async (keyWord, pageNumber) => {
    const response = await axios.get(`${baseUrl}/personal?keyWord=${keyWord}&pageNumber=${pageNumber}`)
    return response.data
}

const getTimeline = async (keyWord, pageNumber) => {
    const respones = await axios.get(`${baseUrl}/timeline?keyWord=${keyWord}&pageNumber=${pageNumber}`)
    return respones.data
}
const postBlog = async (blogObject) => {
    const respones = await axios.post(baseUrl, blogObject)
    return respones.data
}
const updateBlog = async (newObject, id) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    return response.data
}
export default {
    getPersonal
    , getTimeline
    , postBlog
    , updateBlog
}