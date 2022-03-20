import Rect, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewProblem } from '../actions/problemsActions'

import './AddProblemView.css'

const AddProblemView = ({history, match}) => {
    const [title, setTitle] = useState('')
    const [difficulity, setDifficulity] = useState('')
    const [description, setDescription] = useState('')
    const [link, setLink] = useState('')
    const user = useSelector(state => state.userState)
    const dispatch = useDispatch()
    const addProblem = async (event)=>{
        event.preventDefault()
        await dispatch(addNewProblem({title, difficulity, description, link, user: user.id}))
        history.push('/')
    }
    const backToProblemsList = (event) => {
        event.preventDefault()
        history.push('/problems')
    }
    return (<div className='container-problem'>
        <div className='form-header'>adding new problem</div>
        <form onSubmit={addProblem}>
            <div className='title-div'>
                <label>title</label>
                <input type='text' value={title} onChange ={({target})=> setTitle(target.value)}></input>
            </div>
            <div className='difficulity-div'>
                <label>difficulity</label>
                <select id ='difficulity' onChange={({target}) => setDifficulity(target.value)}>
                        <option value=''>all</option>
                        <option value='easy'>easy</option>
                        <option value='meduim'>meduim</option>
                        <option value='hard'>hard</option>
                    </select>
            </div>
            <div className='link-div'>
                <label>link</label>
                <input type='text' value={link} onChange ={({target})=> setLink(target.value)}></input>
            </div>
            <div className="description-div">
                <label>description</label>
                <textarea name='description'  value={description} onChange={({target}) => setDescription(target.value)}></textarea>
            </div>
            <div>
            <button type='submit'> add probelem</button>
            <button type='button' onClick={backToProblemsList}> back</button>
            </div>
        </form>
    </div>)
}
export default AddProblemView