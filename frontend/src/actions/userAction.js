import userService from '../services/users'
import loginService from '../services/login'
export const changeUser = (user) => async dispatch => {
   dispatch({type:'CHANGE_USER_REQUEST'})
   try{
    const data = await userService.updateUser(user)
    dispatch({
     type:'CHANGE_USER_SUCCESS', 
     payload: data
    })
    window.localStorage.setItem(
        'loggedAppUser', JSON.stringify(data)
      )
   }
   catch(error){
       dispatch({
           type:'CHANGE_USER_FAIL',
           payload: error.response && error.response.data.error
             ?  error.response.data.error
             : error.message
       })
   }
       
}

export const loginUser = (user) => async dispatch => {
    dispatch({type:'LOGIN_USER_REQUEST'})
    try{
        const data = await loginService.login(user)
        dispatch({
            type:'LOGIN_USER_SUCCESS',
            payload: data
        })
        window.localStorage.setItem(
            'loggedAppUser', JSON.stringify(data)
          )
    }
    catch(error){
        dispatch({
            type:'LOGIN_USER_FAIL',
            payload: error.response && error.response.data.error
            ?  error.response.data.error
            : error.message
        })
    }
}

export const logoutUser = () => {
    window.localStorage.removeItem('loggedAppUser')
    return {
        type: 'LOGOUT_USER'
    }
}

export const listUsers = (keyWord = '', pageNumber = '') => async dispatch => {
    dispatch({type: 'LIST_USERS_REQUEST'})
    try{
        const data = await userService.getUsers(keyWord, pageNumber)
        dispatch({
            type: 'LIST_USERS_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'LIST_USERS_FAIL',
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
        })
    }
}

export const listFollowing = (id) => async dispatch => {
    dispatch({type: 'LIST_FOLLOWING_REQUEST'})
    try{
        const data = await userService.getFollowing(id)
        dispatch({
            type: 'LIST_FOLLOWING_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'LIST_FOLLOWING_FAIL',
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
    })
    }
}

export const followUser = (id) => async dispatch => {
    dispatch({type: 'FOLLOW_USER_REQUEST'})
    try{
        const data = await userService.followUser(id)
        dispatch({
            type: 'FOLLOW_USER_SUCCESS',
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: 'FOLLOW_USER_FAIL',
            payload: error.response && error.response.data.error
            ? error.response.data.error
            : error.message
    })
    }
}
