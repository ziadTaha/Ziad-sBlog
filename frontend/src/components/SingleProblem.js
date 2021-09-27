import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProblem, editProblem, showProblem } from '../actions/problemsActions'
import './AddProblemView.css'

const SingleProblem = ({history, match}) => {
    
    const problemId = match.params.id
    const [disabled, setDisabled] = useState(true)
    const [title, setTitle] = useState('')
    const [difficulity, setDifficulity] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const problemDetails = useSelector(state => state.showProblem)
    const problemEdit = useSelector(state => state.problemEdit)
    const {loading, problem, error } = problemDetails
    const dispatch = useDispatch()
    useEffect(async() => {
        if(loading) return
        if(!problem||problem.id !== match.params.id)
            await dispatch(showProblem(problemId))
        else{
            setTitle(problem.title)
            setDifficulity(problem.difficulity)
            setDescription(problem.description)
            setLink(problem.url)
        }
        
    }, [dispatch, match, loading])
    const backToProblemsList = (event) => {
        event.preventDefault()
        history.push('/problems')
    }

    const editProblemHandle = async (event) => {
        event.preventDefault()
        await dispatch(editProblem(problemId, {
            title,
            difficulity,
            description,
            link
        }))
    }

    const deleteProblemHandle = async () =>{
        await dispatch(deleteProblem(problemId))
        history.push('/problems')
    } 
    return (<div className='container-problem'>
    <div className='form-header'>problem details</div>
    {loading?<div className='lds-ring'><div></div><div></div><div></div><div></div></div>:error?
    <div>{error}</div>:
    <form onSubmit={editProblemHandle}>
        <div className='title-div'>
        {disabled?<p>{title}</p>:<div>
            <label>title</label>
            <input type='text' value={title} onChange ={({target})=> setTitle(target.value)}></input></div>}
        </div>
        <div className='difficulity-div'>
            {disabled?<p>{difficulity}</p>
            :<div>
            <label>difficulity</label>
            <select id ='difficulity' onChange={({target}) => setDifficulity(target.value)} value={difficulity}>
                    <option value='easy'>easy</option>
                    <option value='meduim'>meduim</option>
                    <option value='hard'>hard</option>
                </select>
            </div>}
            
        </div>
        {disabled?<a href={link} className="link">{link}</a> : <div className='link-div'>
                <label>link</label>
                <input type='text' value={link} onChange ={({target})=> setLink(target.value)}></input>
            </div>}
        <div className="discription-div">
            <label>description</label>
            {disabled?<p>{description}</p>:<textarea name='discription'  rows='6' cols='60' value={description} onChange={({target}) => setDescription(target.value)}></textarea>}
        </div>
        <div>
            {disabled?
            <div>
            <button type='button' onClick={() => setDisabled(false)}> edit</button>
            <button type='button' onClick={backToProblemsList}> back</button>
            </div>
            :
            <div>
                <button type='submit'> edit</button>
                <button type='button' onClick={()=> deleteProblemHandle(problemId)}>delete</button>
                <button type='button' onClick={() => setDisabled(true)}>cancel</button>
                <button type='button' onClick={(backToProblemsList)}> back</button>
            </div>}
            
        </div>
    </form>}
    
</div>)

}

export default SingleProblem