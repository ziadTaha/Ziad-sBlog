import blogsService from '../services/blogs'

export const listBlog = (keyWord = '', pageNumber = '') =>
async dispatch => {
    dispatch({type: 'LIST_BLOGS_REQUEST'})
    try{
        const data = await blogsService.getTimeline(keyWord, pageNumber)
        dispatch({
            type: 'LIST_BLOGS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'LIST_BLOGS_FAIL',
            payload: error.response && error.response.data.error
             ?  error.response.data.error
             : error.message 
        })
    }
}

export const createBlog = (newObject) => async dispatch => {
    dispatch({type: 'CREATE_BLOG_REQUEST'})
    try{
        const data = await blogsService.postBlog(newObject)
        dispatch({
            type: 'CREATE_BLOG_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'CREATE_BLOG_FAIL',
            payload:  error.response && error.response.data.error
            ?  error.response.data.error
            : error.message 
        })
    }
}

export const updateBlog = (newObject, id) => async dispatch => {
    dispatch({type: 'UPDATE_BLOG_REQUEST'})
    try{
        const data = await blogsService.updateBlog(newObject, id)
        dispatch({
            type: 'UPDATE_BLOG_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'UPDATE_BLOG_FAIL',
            payload:  error.response && error.response.data.error
            ?  error.response.data.error
            : error.message 
        })
    }
}