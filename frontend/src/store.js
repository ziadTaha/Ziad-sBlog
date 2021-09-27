import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from "redux-thunk";
import { blogListReducer, blogReducer } from "./reducers/blogsReducer";
import { createProblemReducer, deleteProblemReducer, editProblemReducer, problemsReducer, showProblemReducer } from "./reducers/problemsReducer";
import { followingListReducer, userReducer, usersListReducer } from "./reducers/usersReducer";

const reducer = combineReducers({
    problemsList: problemsReducer,
    userState: userReducer,
    showProblem: showProblemReducer,
    editProblem: editProblemReducer,
    deleteProblem: deleteProblemReducer,
    createProblem: createProblemReducer,
    usersList: usersListReducer,
    followingList: followingListReducer,
    blogsList: blogListReducer,
    postBlog: blogReducer
})
const user = localStorage.getItem('loggedAppUser')?
JSON.parse(localStorage.getItem('loggedAppUser')):null
const initialState = {
    userState:{
        loading: false,
        user
    }
}
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(thunk)))

export default store