import axios from "axios"
const baseUrl = '/api/problems'
axios.defaults.withCredentials = true;
const getAll = async (keyWord, pageNumber, difficulity) => {
    console.log(`${baseUrl}?keyWord=${keyWord}
    &pageNumber=${pageNumber}
    &difficulity=${difficulity}`,keyWord.length)
    const respones = await axios.get(`${baseUrl}?keyWord=${keyWord}&pageNumber=${pageNumber}&difficulity=${difficulity}`)
    
    return respones.data
}
const getProblem = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    return response.data
}
const addNewProblem = async (problemObject) =>{
    const respones = await axios.post(baseUrl, problemObject)
    return respones.data
}
const editProblem = async (id, newObject) => {
    const respones = await axios.put(`${baseUrl}/${id}`, newObject)
    return respones.data
}
const deleteProblem = async (id) => {
    const respones = await axios.delete(`${baseUrl}/${id}`)
    return respones.data
}
export default {
    getAll
    , getProblem
    , addNewProblem
    , editProblem
    , deleteProblem
}