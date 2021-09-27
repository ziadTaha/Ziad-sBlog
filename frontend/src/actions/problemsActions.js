import problemsService from '../services/problem'
export const listProblems = (keyWord = '',
 pageNumber = '', difficulity = '') => async dispatch => {
     try {
         dispatch({type : 'LIST_PROBLEMS_REQUEST'})
         const data =  await problemsService.getAll(keyWord,
            pageNumber, difficulity)
            
        dispatch({
            type: 'LIST_PROBLEMS_SUCCESS',
            payload: data
        })
        
     } catch ( error) {
         dispatch({
             type:'LIST_PROBLEMS_FAIL',
             payload: error.response && error.response.data.error
             ?  error.response.data.error
             : error.message
         })
     }
     
 }

 export const showProblem= (id) => async dispatch =>{
     dispatch({type: 'SHOW_PROBLEM_REQUEST'})
     try{
         const problem = await problemsService.getProblem(id)
         dispatch({
             type: 'SHOW_PROBLEM_SUCCESS'
             , payload: problem
         })
     }
     catch(error){
        dispatch({
            type:'SHOW_PROBLEM_FAIL',
            payload: error.response && error.response.data.error
            ?  error.response.data.error
            : error.message
        })
     }
 }
 export const addNewProblem = (problemObject)=> 
 async dispatch => {
     dispatch({type: 'CREATE_PROBLEM_REQUEST'})
     try{
         const newProblem = await problemsService.
         addNewProblem(problemObject)
         dispatch({
             type: 'CREATE_PROBLEM_SUCCESS'
             , payload: newProblem
         })
     }
     catch(error){
        dispatch({
            type:'CREATE_PROBLEM_FAIL',
            payload: error.response && error.response.data.error
            ?  error.response.data.error
            : error.message
        })
     }
 }
 export const editProblem = (id, problemObject)=> 
 async dispatch => {
     dispatch({type: 'EDIT_PROBLEM_REQUEST'})
     try{
         const editedProblem = await problemsService.
         editProblem(id, problemObject)
         dispatch({
             type: 'EDIT_PROBLEM_SUCCESS'
             , payload: editedProblem
         })
     }
     catch(error){
        dispatch({
            type:'EDIT_PROBLEM_FAIL',
            payload: error.response && error.response.data.error
            ?  error.response.data.error
            : error.message
        })
     }
 }
 export const deleteProblem = (id)=> 
 async dispatch => {
     dispatch({type: 'DELETE_PROBLEM_REQUEST'})
     try{
          await problemsService.deleteProblem(id)
         dispatch({
             type: 'DELETE_PROBLEM_SUCCESS'
         })
     }
     catch(error){
        dispatch({
            type:'DELETE_PROBLEM_FAIL',
            payload: error.response && error.response.data.error
            ?  error.response.data.error
            : error.message
        })
     }
 }