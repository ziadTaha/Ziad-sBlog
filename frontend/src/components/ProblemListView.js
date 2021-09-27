import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { listProblems } from '../actions/problemsActions'
import './ProblemListView.css'
import './utils.css'

const ProblemsListView = ({history}) => {
    
    const problemsList= useSelector(state => state.problemsList)
    const {loading, error, problems, page, pages}  = problemsList
    const [title, setTitle] = useState('')
    const [difficulity, setDifficulity] = useState('')
    
    
    const dispatch = useDispatch()
    useEffect(async()=>{
       await dispatch(listProblems('',1))
       
    },[dispatch])
    const nextpage = async () => {
        await dispatch(listProblems('', page+1))
    }
    const prevpage = async () => {
        await dispatch(listProblems('', page-1))
    }
    const searchProblems = async () => {
        await dispatch(listProblems(title,'', difficulity))
    }
    const addNewProblem = () => {
        history.push('/addProblem')
    }
    if(!problems)
        return null
    return (
        <div>
        
        <div className='container'>
            <div className='search-section'>
                <input type='text' value = { title }
                onChange={({target})=> setTitle(target.value)}></input>
                <div>
                <label >difficulity:</label>
                <select id ='difficulity' onChange={({target})=> setDifficulity(target.value)}>
                    <option value=''>all</option>
                    <option value='easy'>easy</option>
                    <option value='meduim'>meduim</option>
                    <option value='hard'>hard</option>
                </select>
                </div>
                <div>
                <button onClick={searchProblems}> find</button>
                <button onClick={addNewProblem}>add new problem</button>
                </div>
            </div>
            {loading?<div className='lds-ring'><div></div><div></div><div></div><div></div></div>:
            (problems.length >0)?
            <table className='problems-table'>
                <tbody>
                    <tr className='theader'>
                        <th>problem title</th>
                        <th>difficulity</th>
                        <th>link</th></tr>                    
                    { 
                        problems.map( problem =>  <tr className="problem-row" 
                        key={problem.id} > 
                            <td className="title-td" onClick={()=>{history.push(`problems/${problem.id}`)}}>{problem.title}</td>
                            <td>{problem.difficulity}</td>
                            <td><a  className='link'href ={problem.url}> Link</a></td>
                            </tr>)
                    }
                </tbody>
            </table>:<div> no problems found </div>
            }
        </div>
        
        {pages && pages > 0 && <div className='paginator'>
            {page > 1 && <i className='paging-button fas fa-angle-left' onClick={prevpage}></i>}
            <div>{`${page} of ${pages}`}</div>
            {page < pages && <i className='paging-button fas fa-angle-right' onClick={nextpage}></i>}</div>}
        
        </div>
    )
}
export default ProblemsListView