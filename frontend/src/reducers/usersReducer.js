import users from "../services/users"

export const userReducer = (state ={}, action) => {
    switch (action.type){
        case 'CHANGE_USER_REQUEST':
        case 'LOGIN_USER_REQUEST':
            return {
                loading:true
            }
        case 'CHANGE_USER_SUCCESS':    
        case 'LOGIN_USER_SUCCESS':
            return{
                loading: false,
                user: action.payload
            }
        case 'CHANGE_USER_FAIL' || 'LOGIN_USER_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        case 'LOGOUT_USER':
            return {}
        default:
            return state
    }
}  

export const usersListReducer = (state = { users : []}, action) => {
    switch(action.type){
        case 'LIST_USERS_REQUEST':
            return {
                loading: true
            }
        case 'LIST_USERS_SUCCESS':
            return {
                loading: false,
                page: action.payload.page,
                pages: action.payload.pages,
                users : action.payload.users
            }
        case 'LIST_USERS_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const followingListReducer = (state = {}, action) => {
    switch(action.type){
        case 'LIST_FOLLOWING_REQUEST':
        case 'FOLLOW_USER_REQUEST':
            return {
                loading: true
            }
        case 'LIST_FOLLOWING_SUCCESS':
        case 'FOLLOW_USER_SUCCESS':
            return {
                loading: false,
                following: action.payload
            }
        case 'LIST_FOLLOWING_FAIL':
        case 'FOLLOW_USER_FAIL':
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}