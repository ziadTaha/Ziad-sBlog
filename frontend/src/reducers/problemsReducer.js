
export const problemsReducer = (state = {problems:[]}, action) => {
    switch(action.type){
        case 'LIST_PROBLEMS_REQUEST':
            return {
                loading: true, problems:[]
            }
        case 'LIST_PROBLEMS_SUCCESS':
            return {
                loading: false,
                problems: action.payload.problems,
                pages: action.payload.pages,
                page: action.payload.page
            }
        case 'LIST_PROBLEMS_FAIL':
            return {
                loading:false,
                error: action.payload
            }
        default:
            return state
    }
}
export const showProblemReducer = (state = {}, action) => {
    switch(action.type){
        case 'SHOW_PROBLEM_REQUEST':
            return {
                loading:true, ...state
            }
        case 'SHOW_PROBLEM_SUCCESS':
            return {
                loading:false,
                problem: action.payload
            }
        case 'SHOW_PROBLEM_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export const createProblemReducer = (state = {}, action) => {
    switch(action.type){
        case 'CREATE_PROBLEM_REQUEST':
            return {
                loading: true
            }
        case 'CREATE_PROBLEM_SUCCESS':
            return {
                loading: false,
                success: true,
                problem: action.payload
            }
        case 'CREATE_PROBLEM_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export const editProblemReducer = (state = {}, action) => {
    switch(action.type){
        case 'EDIT_PROBLEM_REQUEST':
            return {
                loading:true
            }
        case 'SHOW_PROBLEM_SUCCESS':
            return {
                loading: false,
                success: true,
                problem: action.payload
            }
        case 'SHOW_PROBLEM_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
export const deleteProblemReducer = (state = {}, action) => {
    switch(action.type){
        case 'DELETE_PROBLEM_REQUEST':
            return {
                loading:true
            }
        case 'SHOW_PROBLEM_SUCCESS':
            return {
                loading: false,
                success: true
            }
        case 'SHOW_PROBLEM_FAIL':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}