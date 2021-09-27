export const blogListReducer = (state = {blogs:[]}, action) => {
    
    switch(action.type){
        case 'LIST_BLOGS_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'LIST_BLOGS_SUCCESS':
            
            return{
                loading: false,
                blogs: action.payload.page==1?
                action.payload.blogs: state.blogs.concat(action.payload.blogs),
                page: action.payload.page,
                pages: action.payload.pages
            }
        case 'LIST_BLOGS_FAIL':
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export const blogReducer = (state = {}, action) => {
    switch(action.type){
        case 'CREATE_BLOG_REQUEST':
            return {
                loading: true
            }
        case 'CREATE_BLOG_SUCCESS':
            return{
                loading: false,
                blog : action.payload
            }
        case 'LIST_BLOGS_FAIL':
            return{
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}